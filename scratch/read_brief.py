import fitz

def print_pdf_text(path):
    print(f"=== {path} ===")
    doc = fitz.open(path)
    for i, page in enumerate(doc):
        print(f"\n--- Page {i+1} ---")
        print(page.get_text())
    doc.close()

try:
    print_pdf_text(r"d:\Workspace\Assets\Studio CAB\BRIEF STUDIO CAB.pdf")
except Exception as e:
    print("Error reading brief:", e)

try:
    print_pdf_text(r"d:\Workspace\Assets\Studio CAB\ESTRUCTURA WEB GUÍA STUDIO CAB.pdf")
except Exception as e:
    print("Error reading structure:", e)
