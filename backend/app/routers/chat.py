from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    return ChatResponse(
        reply=(
            "Hi! I am the Portfolio AI Assistant."
            f"I have received your message: '{request.message}'"
        )
    )