# Show 3 button options based on the file content
st.markdown("### Quick Actions")
col1, col2, col3 = st.columns(3)

option_prompts = {
    "Summarize the content": "Please summarize the uploaded document.",
    "Find key points": "List the key points from the document.",
    "Translate the document": "Translate the document into English."
}

if col1.button("Summarize the content"):
    action_input = option_prompts["Summarize the content"]
elif col2.button("Find key points"):
    action_input = option_prompts["Find key points"]
elif col3.button("Translate the document"):
    action_input = option_prompts["Translate the document"]
else:
    action_input = None

if action_input:
    st.write(f"Selected Option: {action_input}")

    if "langchain" in st.session_state:
        response = get_langchain_response(action_input, session_context)
    else:
        response = get_groq_response(action_input)

    session_memory.update(action_input, response)
    st.write("AI Response:", response)
