from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain

# Langchain response generation
def get_langchain_response(user_input, session_context):
    model = ChatOpenAI(temperature=0)
    conversation = ConversationChain(memory=session_context, llm=model)

    # Generate response using Langchain model
    response = conversation.predict(input=user_input)
    return response
