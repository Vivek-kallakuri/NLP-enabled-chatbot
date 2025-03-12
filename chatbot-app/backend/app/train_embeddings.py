import json
import numpy as np
from sentence_transformers import SentenceTransformer

def train_embeddings(n_epochs=1):
    metadata_path = "app/metadata.json"
    with open(metadata_path, "r") as f:
        qa_pairs = json.load(f)
    questions = [pair["question"] for pair in qa_pairs]
    
    model = SentenceTransformer("all-MiniLM-L6-v2")
    
    embeddings = None
    for epoch in range(n_epochs):
        print(f"Epoch {epoch+1}/{n_epochs}")
        embeddings = model.encode(questions, convert_to_numpy=True)
    
    np.save("app/embeddings.npy", embeddings)
    print("Embeddings saved to app/embeddings.npy")

if __name__ == "__main__":
    train_embeddings(n_epochs=20)
