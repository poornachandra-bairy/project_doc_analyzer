import streamlit as st
from langchain_handler import get_langchain_response
from groq_api import get_groq_response
from session_manager import SessionMemory
from utils import extract_text_from_file

# Initialize session memory
session_memory = SessionMemory()

# Streamlit page config
st.set_page_config(page_title="Document Analyzer", layout="wide")
st.title("📄 Document Analyzer - Powered by Groq and Langchain")

# File uploader
uploaded_file = st.file_uploader("Upload a file", type=["pdf", "docx", "txt"])

# Initialize extracted_text
extracted_text = ""

if uploaded_file:
    file_extension = uploaded_file.name.split('.')[-1].lower()
    extracted_text = extract_text_from_file(uploaded_file, file_extension)

    st.success("File uploaded successfully!")

    # Quick Actions as buttons
    st.markdown("### Quick Actions")
    col1, col2, col3 = st.columns(3)

    option_prompts = {
        "Summarize the content": "Summarize this document. Keep it very short.",
        "Find key points": "List the key points from this document and explain in bullet points. Keep it very short.",
        "Translate the document": "Translate this document to Hindi."
    }

    # Handle button clicks
    selected_option = None
    with col1:
        if st.button("Summarize"):
            selected_option = option_prompts["Summarize the content"]
    with col2:
        if st.button("Find Key Points"):
            selected_option = option_prompts["Find key points"]
    with col3:
        if st.button("Translate"):
            selected_option = option_prompts["Translate the document"]

    if selected_option:
        st.markdown(f"**Selected Prompt:** {selected_option}")
        ai_input = f"{selected_option}\n\n{extracted_text}"
        ai_response = get_groq_response(ai_input)
        session_memory.update(selected_option, ai_response)
        st.write("AI Response:", ai_response)

    # Manual question input
    st.markdown("---")
    st.markdown("### Ask Your Own Question")
    session_context = session_memory.get_context()
    user_input = st.text_input("Ask a question about the document:")

    if user_input:
        combined_input = f"{user_input}\n\n{extracted_text}"
        if "langchain" in st.session_state:
            response = get_langchain_response(combined_input, session_context)
        else:
            response = get_groq_response(combined_input)
        session_memory.update(user_input, response)
        st.write("AI Response:", response)
