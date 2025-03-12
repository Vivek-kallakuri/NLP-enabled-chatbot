# Chatbot App

A full-stack chatbot application that demonstrates a retrieval-based question–answering system built using FastAPI (backend) and React (frontend). This open-source project leverages NLP with SentenceTransformer for improved query matching using precomputed embeddings from a JSON file containing 100 Q&A pairs. It is designed to serve as a demo for ERP solutions and can be extended with advanced features.

## Features

- **Retrieval-Based Q&A:**  
  Uses SentenceTransformer to generate embeddings for Q&A pairs and computes cosine similarity to return the most relevant answer.

- **Full-Stack Architecture:**  
  - **Backend:** Built with FastAPI, serving endpoints for chatbot interactions and metadata retrieval.
  - **Frontend:** Built with React, featuring a floating chat widget with suggested questions, minimize, and close options.
  
- **Live Reload:**  
  Dockerized containers for both backend and frontend, with code mounted for live reloading during development.

- **Customizable UI:**  
  The chat widget UI is customizable and responsive, with ample space for displaying chat history.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)
- [GitHub CLI (gh)](https://cli.github.com/)

### Running the Application

1. **Build and Run Containers:**

   From the project root, run:
   ```bash
   docker-compose build --no-cache
   docker-compose up

Backend: Accessible at http://localhost:49151
Frontend: Accessible at http://localhost:3001
Train the Embeddings:

Once the containers are up, generate embeddings by executing:
docker exec -it chatbot-backend python app/train_embeddings.py

This command processes the Q&A pairs in metadata.json and creates an embeddings.npy file used by the /chat endpoint.

