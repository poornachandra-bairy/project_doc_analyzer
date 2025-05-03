class SessionMemory:
    def __init__(self):
        self.memory = []

    def get_context(self):
        # Return the last 4 messages as context for Langchain or Groq API
        return self.memory[-4:]

    def update(self, user_input, response):
        # Store new conversation in memory (up to 4 interactions)
        self.memory.append({"user_input": user_input, "response": response})
        if len(self.memory) > 4:
            self.memory.pop(0)  # Keep the memory size to the last 4 interactions
