import os
import logging
from langchain.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.llms import HuggingFaceHub  # Using Hugging Face Hub for LLM fallback

# Load environment variables
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
huggingface_api_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")  # Make sure to set this

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("main.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def load_documents(file_path):
    file_extension = os.path.splitext(file_path)[-1].lower()
    logger.info(f"Loading document from path: {file_path} with extension: {file_extension}")

    if file_extension == ".pdf":
        loader = PyPDFLoader(file_path)
    elif file_extension == ".docx":
        loader = Docx2txtLoader(file_path)
    elif file_extension == ".txt":
        loader = TextLoader(file_path)
    else:
        logger.error(f"Unsupported file type: {file_path} with extension {file_extension}")
        raise ValueError(f"Unsupported file type: {file_path} with extension {file_extension}")

    return loader.load()

def ingest(file_path):
    documents = load_documents(file_path)
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = splitter.split_documents(documents)

    # Check OpenAI quota; fallback to Hugging Face embeddings if quota is reached
    if is_openai_quota_available():
        embeddings = OpenAIEmbeddings()
    else:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    vectorstore = FAISS.from_documents(docs, embeddings)
    return vectorstore

def create_chatbot(vectorstore):
    # Check OpenAI quota; fallback to Hugging Face LLM if quota is reached
    if is_openai_quota_available():
        llm = OpenAI(temperature=0)
    else:
        llm = HuggingFaceHub(
            repo_id="google/flan-t5-base",  # Replace with preferred model
            model_kwargs={"temperature": 0.5, "max_length": 512}
        )

    from langchain.chains import ConversationalRetrievalChain
    chatbot = ConversationalRetrievalChain.from_llm(llm, retriever=vectorstore.as_retriever())
    return chatbot

def is_openai_quota_available():
    # Implement your quota check logic here (e.g., check your API usage or quota)
    return False  # Assuming quota is not available for this example
