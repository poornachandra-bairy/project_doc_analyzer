import requests
import streamlit as st

def get_groq_response(text_input):
    groq_api_key = st.secrets["GROQ_API_KEY"]

    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {groq_api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "user", "content": text_input}
        ],
        "temperature": 0.7,
        "max_tokens": 500,
        "top_p": 1.0,
        "stream": False
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        response_json = response.json()
        st.write("Groq API response:", response_json)  # Debug output
        groq_output = response_json["choices"][0]["message"]["content"]
        return groq_output
    else:
        st.error(f"Error: {response.status_code} - {response.text}")
        return "There was an error processing the request."
