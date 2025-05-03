import os
from io import BytesIO
from PyPDF2 import PdfReader
from docx import Document

def extract_text_from_file(uploaded_file):
    file_extension = os.path.splitext(uploaded_file.name)[-1].lower()

    if file_extension == ".pdf":
        reader = PdfReader(uploaded_file)
        return "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])

    elif file_extension == ".docx":
        doc = Document(uploaded_file)
        return "\n".join([para.text for para in doc.paragraphs])

    elif file_extension == ".txt":
        return uploaded_file.getvalue().decode("utf-8")

    else:
        return "Unsupported file type"
