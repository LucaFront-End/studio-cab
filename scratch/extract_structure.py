import fitz
import sys

doc = fitz.open(r'd:\Workspace\Assets\Studio CAB\ESTRUCTURA WEB GUÍA STUDIO CAB.pdf')
print("--- ESTRUCTURA WEB GUÍA STUDIO CAB.pdf ---")
for i in range(len(doc)):
    print(f"\n--- Page {i+1} ---")
    print(doc[i].get_text())
doc.close()
