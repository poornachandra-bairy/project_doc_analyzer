import os
import streamlit as st
from google.cloud import aiplatform

# Set the credentials path from Streamlit secrets
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = st.secrets["GOOGLE_APPLICATION_CREDENTIALS"]

# Set up Streamlit page
st.set_page_config(page_title="Chat with AI", layout="wide")
st.title("📄 Chat with AI - Powered by Google Vertex AI")

# Function to get AI predictions from Vertex AI
def predict_with_vertex_ai(text_input):
    # Initialize Vertex AI client
    aiplatform.init(
        project=st.secrets["GCP_PROJECT_ID"],
        location=st.secrets["GCP_LOCATION"]
    )

    # Load endpoint
    endpoint = aiplatform.Endpoint(endpoint_name=st.secrets["GCP_ENDPOINT_ID"])

    # Predict
    response = endpoint.predict(instances=[{"content": text_input}])
    return response.predictions

# File upload UI
uploaded_file = st.file_uploader("Upload a file", type=["pdf", "docx", "txt"])

if uploaded_file:
    file_extension = os.path.splitext(uploaded_file.name)[-1]
    st.success("File uploaded successfully!")

    # Basic text extraction
    if file_extension == ".pdf":
        extracted_text = "Extracted text from PDF (TODO: implement parser)"
    elif file_extension == ".docx":
        extracted_text = "Extracted text from DOCX (TODO: implement parser)"
    elif file_extension == ".txt":
        extracted_text = uploaded_file.getvalue().decode("utf-8")
    else:
        extracted_text = ""

    user_input = st.text_input("Ask a question about the document:")

    if user_input:
        response = predict_with_vertex_ai(user_input)
        st.write("AI Response:", response)
