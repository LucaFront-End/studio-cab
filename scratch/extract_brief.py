import fitz
import sys

doc = fitz.open(r'd:\Workspace\Assets\Studio CAB\BRIEF STUDIO CAB.pdf')
print("--- BRIEF STUDIO CAB.pdf ---")
for i, page in enumerate(doc):
    print(f"\n--- Page {i+1} ---")
    print(page.get_text())
doc.close()
