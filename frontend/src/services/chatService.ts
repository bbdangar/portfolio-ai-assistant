import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ChatResponse {
  reply: string;
}

export async function sendChat(message: string): Promise<string> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not set");
  }

  const res = await api.post<ChatResponse>("/chat", { message });
  return res.data.reply;
}