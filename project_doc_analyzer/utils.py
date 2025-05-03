from PyPDF2 import PdfReader
import docx

def extract_text_from_file(uploaded_file, file_extension):
    # Extract text based on file extension
    if file_extension == "pdf":
        return extract_pdf_text(uploaded_file)
    elif file_extension == "docx":
        return extract_docx_text(uploaded_file)
    elif file_extension == "txt":
        return uploaded_file.getvalue().decode("utf-8")
    else:
        raise ValueError("Unsupported file type")

def extract_pdf_text(uploaded_file):
    reader = PdfReader(uploaded_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_docx_text(uploaded_file):
    doc = docx.Document(uploaded_file)
    text = ""
    for para in doc.paragraphs:
        text += para.text
    return text
