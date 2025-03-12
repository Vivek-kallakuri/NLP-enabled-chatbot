from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import numpy as np
from sentence_transformers import SentenceTransformer
from scipy.spatial.distance import cosine

app = FastAPI(title="Chatbot Backend")

# Enable CORS for your React app running on localhost:3001
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/metadata")
def read_metadata():
    try:
        with open("app/metadata.json", "r") as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="metadata.json not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"message": "Hello from FastAPI backend!"}

# Load the pre-trained model
model = SentenceTransformer("all-MiniLM-L6-v2")
try:
    embeddings = np.load("app/embeddings.npy")
except Exception as e:
    embeddings = None
    print("Embeddings not found. Please run train_embeddings.py.")

@app.post("/chat")
def chat_endpoint(message: str):
    try:
        with open("app/metadata.json", "r") as f:
            qa_pairs = json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error loading metadata: " + str(e))
    
    if embeddings is None:
        return {"response": "Embeddings not available. Please run the training script."}
    
    # Compute the embedding for the user's query
    query_embedding = model.encode([message], convert_to_numpy=True)[0]
    
    best_score = float("inf")
    best_index = -1
    for i, emb in enumerate(embeddings):
        score = cosine(query_embedding, emb)
        if score < best_score:
            best_score = score
            best_index = i
    
    # Adjust threshold as needed (lower means more similar)
    threshold = 0.5
    if best_score < threshold:
        answer = qa_pairs[best_index]["answer"]
    else:
        answer = "I'm sorry, I don't have an answer for that question."
    return {"response": answer}
