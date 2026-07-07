from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_message():
    response = client.get("/api/message")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from the Python FastAPI Backend!"}
