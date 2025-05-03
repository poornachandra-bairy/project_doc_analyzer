import openai_secret_manager
import requests

# Function to get Groq API response
def get_groq_response(user_input):
    api_key = openai_secret_manager.get_secret("groq")['GROQ_API_KEY']  # assuming API key is stored in Streamlit secrets
    endpoint = "https://api.groq.com/v1/predict"
    headers = {"Authorization": f"Bearer {api_key}"}
    data = {"input": user_input}

    # Send the request to Groq API
    response = requests.post(endpoint, headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()["response"]
    else:
        return "Error with the Groq API response."
