import os
import streamlit as st
from langchain.chat_models import ChatGroq
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import PromptTemplate
from PyPDF2 import PdfReader

from main import extract_text_from_pdf, get_summary_and_options

# Set API Key directly from Streamlit secrets
groq_api_key = st.secrets["GROQ_API_KEY"]
os.environ["GROQ_API_KEY"] = groq_api_key

# Session memory: store last 4 interactions
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

st.set_page_config(page_title="RAG AI Chat", layout="wide")
st.title("📄 Chat with Your Document - Powered by Groq + Langchain")

# File Upload
uploaded_file = st.file_uploader("Upload a PDF file", type=["pdf"])
if uploaded_file:
    with st.spinner("Reading and summarizing document..."):
        text = extract_text_from_pdf(uploaded_file)
        summary, options = get_summary_and_options(text)

        st.markdown(f"**📝 Summary:** {summary}")
        st.markdown("### 💡 Suggested Questions:")
        for i, option in enumerate(options, 1):
            st.button(option, key=f"option_{i}", on_click=lambda opt=option: st.session_state.update({"user_input": opt}))

    # Custom user input
    user_input = st.text_input("Or ask your own question:", key="user_input")

    if user_input:
        with st.spinner("Thinking..."):
            llm = ChatGroq(temperature=0.2, groq_api_key=groq_api_key, model_name="llama3-8b-8192")
            memory = ConversationBufferWindowMemory(k=4, memory_key="chat_history", return_messages=True)

            prompt_template = PromptTemplate(
                input_variables=["question", "chat_history"],
                template="""
You are an AI assistant. Use the document context and your reasoning to answer.

Chat history:
{chat_history}

User question:
{question}
"""
            )

            chain = ConversationalRetrievalChain.from_llm(
                llm=llm,
                retriever=None,  # No vector store for now
                memory=memory,
                combine_docs_chain_kwargs={"prompt": prompt_template}
            )

            response = chain.run(question=user_input)
            st.session_state.chat_history.append(("User", user_input))
            st.session_state.chat_history.append(("AI", response))
            st.markdown(f"**🤖 Response:** {response}")

    # Display chat history
    if st.session_state.chat_history:
        st.markdown("### 🧠 Conversation Memory (Last 4):")
        for role, msg in st.session_state.chat_history[-8:]:
            st.markdown(f"**{role}:** {msg}")
