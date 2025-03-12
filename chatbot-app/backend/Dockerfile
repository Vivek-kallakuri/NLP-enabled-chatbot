FROM python:3.9-slim

WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install --no-cache-dir -r requirements.txt && \
    pip install numpy && \
    python -c "import numpy; print('Numpy version:', numpy.__version__)"


# Copy application code
COPY . .

# Expose the port (make sure it matches the port your app uses)
EXPOSE 49151

# Run the FastAPI app using uvicorn with reload enabled
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "49151", "--reload"]
