import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.vectorstores import Chroma

from app.config import VECTORSTORE_DIR

load_dotenv()

# Disable Chroma telemetry noise
os.environ.setdefault("ANONYMIZED_TELEMETRY", "False")

# ----------------------------
# Embeddings & Vector DB
# ----------------------------
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

vectordb = Chroma(
    persist_directory=str(VECTORSTORE_DIR),
    embedding_function=embeddings,
    collection_name="portfolio_openai_v1",
)

retriever = vectordb.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 6},
)

# ----------------------------
# LLM
# ----------------------------
llm = ChatOpenAI(
    model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
    temperature=0.2,
)

# ----------------------------
# Prompt
# ----------------------------
SYSTEM_PROMPT = """
You are Bhagirath Dangar’s official AI assistant.

Rules:
- Use ONLY the provided context
- Do NOT use prior knowledge
- Do NOT invent companies, skills, experience, emails, or numbers
- You MAY summarize or rephrase the provided context
- If the question cannot be answered from the context, say:
  "That information is not available in Bhagirath’s profile yet."
- Keep answers short (1–5 lines)
- Be factual and professional
- Do NOT explain reasoning
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    (
        "human",
        """
Context:
{context}

Question:
{question}
""",
    ),
])

chain = prompt | llm

# ----------------------------
# Public API
# ----------------------------
GREETINGS = {"hi", "hello", "hey", "good morning", "good evening"}


def answer_query(question: str, k: int = 6) -> str:
    clean_question = question.strip()

    if not clean_question:
        return "Please ask a valid question about Bhagirath Dangar."

    if clean_question.lower() in GREETINGS:
        return "Hello! I’m Bhagirath’s AI assistant. Ask me about his skills, experience, or projects."

    docs = retriever.invoke(clean_question)

    if not docs:
        return "That information is not available in Bhagirath’s profile yet."

    context = "\n\n".join(d.page_content for d in docs)

    response = chain.invoke({
        "context": context,
        "question": clean_question,
    })

    return response.content.strip()