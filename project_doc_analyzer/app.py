import streamlit as st
from main import ingest, create_chatbot
from dotenv import load_dotenv
import tempfile
import os

load_dotenv()  # Load .env locally
st.set_page_config(page_title="Chat with Your File", layout="wide")
st.title("📄 Chat with PDF / Word / Text Files")

uploaded_file = st.file_uploader("Upload a file", type=["pdf", "docx", "txt"])

if uploaded_file:
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        tmp_file.write(uploaded_file.getvalue())
        tmp_path = tmp_file.name

    st.success("File uploaded! Initializing chatbot...")
    vectorstore = ingest(tmp_path)
    chatbot = create_chatbot(vectorstore)
    os.remove(tmp_path)

    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    user_input = st.text_input("Ask a question based on the document:")

    if user_input:
        response = chatbot.run(user_input)
        st.session_state.chat_history.append(("You", user_input))
        st.session_state.chat_history.append(("Bot", response))

    for speaker, msg in st.session_state.chat_history[-30:]:
        st.markdown(f"**{speaker}:** {msg}")
