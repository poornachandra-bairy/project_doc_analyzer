import os
from dotenv import load_dotenv
from langchain_community.document_loaders import UnstructuredWordDocumentLoader
from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load environment variables
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

def load_documents(file_path):
    # Get the file extension from the file path
    file_name, file_extension = os.path.splitext(file_path)
    print(f"Loading file: {file_path} with extension {file_extension}")  # Log the file path and extension

    # Check file extension and choose loader
    if file_extension == ".pdf":
        loader = PyPDFLoader(file_path)
    elif file_extension == ".docx":
        loader = UnstructuredWordDocumentLoader(file_path)
    elif file_extension == ".txt":
        loader = TextLoader(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_path} with extension {file_extension}")
    return loader.load()

def ingest(file_path):
    documents = load_documents(file_path)
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs = splitter.split_documents(documents)
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    vectorstore = FAISS.from_documents(docs, embeddings)
    return vectorstore

def create_chatbot(vectorstore):
    memory = ConversationBufferWindowMemory(k=15, return_messages=True)
    llm = ChatOpenAI(temperature=0, openai_api_key=openai_api_key)
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return qa_chain
