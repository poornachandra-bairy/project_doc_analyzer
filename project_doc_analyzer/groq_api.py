import requests
import streamlit as st

# Function to get Groq API response
def get_groq_response(text_input):
    # Access the Groq API key directly from Streamlit secrets
    groq_api_key = st.secrets["GROQ_API_KEY"]  # Ensure the secret is set in Streamlit

    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {groq_api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-8b-8192",  # Specify the model you're using
        "prompt": text_input,        # Pass the input text
        "max_tokens": 500            # Maximum number of tokens for the response
    }

    # Send POST request to Groq API
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        # Parse the response and extract the generated text
        response_json = response.json()
        groq_output = response_json["choices"][0]["text"]
        return groq_output
    else:
        # Handle error and display the error message in Streamlit
        st.error(f"Error: {response.status_code} - {response.text}")
        return "There was an error processing the request."
