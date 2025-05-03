import streamlit as st
from langchain_handler import get_langchain_response
from groq_api import get_groq_response
from session_manager import SessionMemory
from utils import extract_text_from_file

# Initialize session memory
session_memory = SessionMemory()

# Set Streamlit page settings
st.set_page_config(page_title="Document Analyzer", layout="wide")
st.title("📄 Document Analyzer - Powered by Groq and Langchain")

# File upload UI
uploaded_file = st.file_uploader("Upload a file", type=["pdf", "docx", "txt"])

if uploaded_file:
    file_extension = uploaded_file.name.split('.')[-1].lower()
    extracted_text = extract_text_from_file(uploaded_file, file_extension)
    
    st.success("File uploaded successfully!")
    st.write("Extracted Text:", extracted_text)

    # Session memory management: Retrieve last 4 conversation context
    session_context = session_memory.get_context()

    user_input = st.text_input("Ask a question about the document:")

    if user_input:
        if "langchain" in st.session_state:
            # Use Langchain for AI response
            response = get_langchain_response(user_input, session_context)
        else:
            # Use Groq API for AI response
            response = get_groq_response(user_input)

        # Update session memory with new input and response
        session_memory.update(user_input, response)
        st.write("AI Response:", response)

    # Show 3 options based on the file content
    options = ["Summarize the content", "Find key points", "Translate the document"]
    selected_option = st.selectbox("Choose an option:", options)

    if selected_option:
        st.write(f"Selected Option: {selected_option}")
