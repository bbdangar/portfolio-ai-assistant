
def normalize_personal_info(data: dict) -> str:
    location = data.get("location", "India")
    total_exp = data.get("total_experience", "10+ years")
    tagline = data.get("tagline", "")

    about = " ".join(data.get("about", []))
    career_objective = data.get("career_objective", "")

    return f"""
Bhagirath Dangar is a senior Full Stack and AI Engineer with over {total_exp} of experience.
He is based in {location}.

Professional headline:
{tagline}

Professional summary:
{about}

Career objective:
{career_objective}

Primary expertise includes Laravel, Angular, React, Vue, Next.js, MySQL,
REST APIs, scalable SaaS architecture, and AI-powered applications
using Retrieval-Augmented Generation (RAG) and LLMs.
""".strip()

def normalize_experience(experiences: list[dict]) -> list[str]:
    docs = []

    for exp in experiences:
        achievements = ""
        if exp.get("achievements"):
            achievements = " Key achievements include: " + " ".join(exp["achievements"])

        docs.append(
            f"""
Bhagirath Dangar worked as a {exp['role']} at {exp['company']} from {exp['duration']}.
The role involved {exp['details']}.{achievements}
This position was {exp.get('job_type', 'On-site')} and based in {exp['location']}.
He primarily worked with Laravel, Angular, REST APIs, databases, and scalable system design.
""".strip()
        )

    return docs

def normalize_skills(skills: list[str]) -> str:
    return f"""
Bhagirath Dangar’s technical skill set includes:
{", ".join(skills)}.

These skills have been applied across enterprise SaaS platforms,
accounting systems, inventory management, and AI-powered applications.
""".strip()


def normalize_projects(projects: list[dict]) -> list[str]:
    docs = []

    for proj in projects:
        docs.append(
            f"""
Bhagirath Dangar worked on the project "{proj['name']}".
Project overview: {proj['description']}
Technologies used: {", ".join(proj["tech"])}.
The project focused on scalability, performance, and real-world business requirements.
""".strip()
        )

    return docs
