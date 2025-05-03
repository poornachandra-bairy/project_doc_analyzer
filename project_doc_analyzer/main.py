import os
import logging
from langchain.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from dotenv import load_dotenv
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceEmbeddings
from langchain.llms import OpenAI
from llama_cpp import Llama  # or your local LLaMA wrapper
from your_local_llm_wrapper import LocalLlamaLLM  # hypothetical wrapper
# Make sure you install and setup llama-cpp-python or ollama properly

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

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

    if is_openai_quota_available():
        embeddings = OpenAIEmbeddings()
    else:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    vectorstore = FAISS.from_documents(docs, embeddings)
    return vectorstore

def create_chatbot(vectorstore):
    if is_openai_quota_available():
        llm = OpenAI(temperature=0)
    else:
        # Replace with your local LLaMA model instance
        llm = LocalLlamaLLM(model_path="models/llama-2.gguf")  # customize

    from langchain.chains import ConversationalRetrievalChain
    chatbot = ConversationalRetrievalChain.from_llm(llm, retriever=vectorstore.as_retriever())
    return chatbot
