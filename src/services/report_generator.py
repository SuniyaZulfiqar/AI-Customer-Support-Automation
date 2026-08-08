import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_report(question, sql, results):
    prompt = f"""
You are an AI business intelligence assistant.

Generate a concise, professional answer to the user's question
based ONLY on the SQL query and database results provided below.

User question:
{question}

SQL query:
{sql}

Database results:
{results}

Rules:
- Answer the user's question directly.
- Do not invent information.
- Do not mention that you are an AI.
- Do not generate SQL.
- Use the database results as the source of truth.
- Keep the answer concise and professional.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content.strip()