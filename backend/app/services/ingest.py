import json
import os
from pathlib import Path
from dotenv import load_dotenv

from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter

from app.config import VECTORSTORE_DIR, DATA_DIR
from app.services.normalize import (
    normalize_personal_info,
    normalize_experience,
    normalize_skills,
    normalize_projects,
)

load_dotenv()

# Disable Chroma telemetry noise
os.environ.setdefault("ANONYMIZED_TELEMETRY", "False")


def ingest():
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

    documents: list[Document] = []

    # ---------- Personal Information ----------
    with open(DATA_DIR / "personal-information.json", "r", encoding="utf-8") as f:
        personal_data = json.load(f)

    documents.append(
        Document(
            page_content=normalize_personal_info(personal_data),
            metadata={"source": "personal-information.json", "type": "profile"},
        )
    )

    # ---------- Experience ----------
    with open(DATA_DIR / "experience.json", "r", encoding="utf-8") as f:
        experience_data = json.load(f)

    for text in normalize_experience(experience_data):
        documents.append(
            Document(
                page_content=text,
                metadata={"source": "experience.json", "type": "experience"},
            )
        )

    # ---------- Skills (optional) ----------
    skills_path = DATA_DIR / "skills.json"
    if skills_path.exists():
        with open(skills_path, "r", encoding="utf-8") as f:
            skills_data = json.load(f)

        documents.append(
            Document(
                page_content=normalize_skills(skills_data),
                metadata={"source": "skills.json", "type": "skills"},
            )
        )

    # ---------- Projects (optional) ----------
    projects_path = DATA_DIR / "projects.json"
    if projects_path.exists():
        with open(projects_path, "r", encoding="utf-8") as f:
            projects_data = json.load(f)

        for text in normalize_projects(projects_data):
            documents.append(
                Document(
                    page_content=text,
                    metadata={"source": "projects.json", "type": "project"},
                )
            )

    if not documents:
        print("⚠️ No normalized documents created")
        return

    # ---------- Chunking (CRITICAL) ----------
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
    )
    documents = splitter.split_documents(documents)

    # ---------- Vector DB ----------
    vectordb = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory=str(VECTORSTORE_DIR),
        collection_name="portfolio_openai_v1",
    )

    vectordb.persist()
    print(f"✅ Ingest finished. chunks indexed: {len(documents)}")


if __name__ == "__main__":
    ingest()