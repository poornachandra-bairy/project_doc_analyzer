import os
import logging
from dotenv import load_dotenv
from langchain.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import OpenAI
from llama_cpp import Llama  # or your local LLaMA wrapper
from your_local_llm_wrapper import LocalLlamaLLM  # hypothetical local wrapper

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


def is_openai_quota_available():
    """Check if OpenAI key is present and usable."""
    if not openai_api_key:
        logger.warning("OPENAI_API_KEY not set. Falling back to local LLaMA.")
        return False
    try:
        # Lightweight test call or logic to test quota if needed
        from openai import OpenAIError
        embeddings = OpenAIEmbeddings()
        embeddings.embed_query("ping")  # test a small call
        return True
    except Exception as e:
        logger.warning(f"OpenAI quota likely exceeded or key invalid: {e}")
        return False


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


def ingest(file_path, use_openai=True):
    logger.info("Starting ingestion process")
    documents = load_documents(file_path)
    logger.info(f"Loaded {len(documents)} documents")

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = splitter.split_documents(documents)

    if use_openai:
        embeddings = OpenAIEmbeddings()
        logger.info("Using OpenAI embeddings")
    else:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        logger.info("Using HuggingFace embeddings")

    vectorstore = FAISS.from_documents(docs, embeddings)
    return vectorstore


def create_chatbot(vectorstore, use_openai=True):
    logger.info("Creating chatbot")

    if use_openai:
        logger.info("Using OpenAI LLM")
        llm = OpenAI(temperature=0)
    else:
        logger.info("Using local LLaMA model")
        llm = LocalLlamaLLM(model_path="models/llama-2.gguf")  # customize as needed

    from langchain.chains import ConversationalRetrievalChain
    chatbot = ConversationalRetrievalChain.from_llm(llm, retriever=vectorstore.as_retriever())
    return chatbot
