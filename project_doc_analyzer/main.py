import os
import logging
from langchain.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from dotenv import load_dotenv

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
    logger.info("Starting ingestion process")
    documents = load_documents(file_path)
    logger.info(f"Loaded {len(documents)} documents")

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = splitter.split_documents(documents)
    logger.info(f"Split into {len(docs)} chunks")

    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    vectorstore = FAISS.from_documents(docs, embeddings)
    logger.info("Vectorstore created successfully")
    return vectorstore

def create_chatbot(vectorstore):
    from langchain.chains import ConversationalRetrievalChain
    from langchain.chat_models import ChatOpenAI

    logger.info("Creating chatbot using vectorstore")
    llm = ChatOpenAI(temperature=0.0, openai_api_key=openai_api_key)
    return ConversationalRetrievalChain.from_llm(llm, vectorstore.as_retriever())
