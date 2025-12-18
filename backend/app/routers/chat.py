from fastapi import APIRouter
from pydantic import BaseModel
from app.services.qa_chain import answer_query

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
async def chat(req: ChatRequest):
    reply = answer_query(req.message)
    return ChatResponse(reply=reply)
