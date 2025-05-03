import os
import streamlit as st
from main import extract_text_from_file
import requests

# Set up Streamlit page
st.set_page_config(page_title="Chat with AI - Powered by Groq", layout="wide")
st.title("📄 Chat with AI - Powered by Groq")

# Set your API key from Streamlit secrets
GROQ_API_KEY = st.secrets["GROQ_API_KEY"]
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Function to call Groq API
def query_groq(prompt):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "mixtral-8x7b-32768",  # Or other model like llama3-8b, gemma-7b-it
        "messages": [
            {"role": "system", "content": "You're an assistant that helps with understanding documents."},
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(GROQ_API_URL, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"Error: {response.text}"

# File upload UI
uploaded_file = st.file_uploader("Upload a file", type=["pdf", "docx", "txt"])

if uploaded_file:
    text = extract_text_from_file(uploaded_file)
    st.text_area("Extracted Document Text", text, height=200)

    user_input = st.text_input("Ask a question about the document:")
    if user_input:
        combined_prompt = f"{text}\n\nQuestion: {user_input}"
        response = query_groq(combined_prompt)
        st.write("🧠 AI Response:")
        st.success(response)
