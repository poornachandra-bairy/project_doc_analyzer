from PyPDF2 import PdfReader
import re

def extract_text_from_pdf(uploaded_file):
    reader = PdfReader(uploaded_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()

def get_summary_and_options(text):
    # Basic summary logic — can be replaced with a better summarizer later
    first_20_words = " ".join(text.split()[:20])
    summary = f"This document appears to be about: {first_20_words}..."

    # Generate 3 prompt suggestions
    options = [
        "Summarize the entire document.",
        "What are the key points in this document?",
        "Does this document contain any important dates or deadlines?"
    ]
    return summary, options
