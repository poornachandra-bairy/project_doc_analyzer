import os
import logging
from langchain.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from dotenv import load_dotenv
from google.cloud import aiplatform
from google.auth.exceptions import DefaultCredentialsError

# Load environment variables
load_dotenv()
project_id = os.getenv("GOOGLE_PROJECT_ID")  # Set in .env
region = os.getenv("GOOGLE_REGION", "us-central1")
model_id = os.getenv("GOOGLE_MODEL_ID")  # Set in .env

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

# Google Cloud AI Setup
def setup_google_ai():
    try:
        aiplatform.init(project=project_id, location=region)
        return aiplatform.Endpoint(model_id)
    except DefaultCredentialsError:
        logger.error("Google Cloud credentials not found. Please authenticate with Google Cloud.")
        raise

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

    vectorstore = FAISS.from_documents(docs, embeddings=None)  # No embeddings for now
    return vectorstore

def create_chatbot(vectorstore):
    endpoint = setup_google_ai()
    chatbot = ConversationalRetrievalChain.from_llm(endpoint, retriever=vectorstore.as_retriever())
    return chatbot
