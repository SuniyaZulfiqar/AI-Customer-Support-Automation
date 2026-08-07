import ollama


def generate_report(question, sql, results):

    prompt = f"""
You are an AI Customer Support Business Intelligence Assistant.

Your job is to help business managers understand customer support data.

Manager's Question:
{question}

Query Results:
{results}

Instructions:

- Never greet the user.
- Never say "Dear User".
- Never mention SQL, queries, databases, or technical details.
- Explain the result in clear business language.
- Keep the answer between 50 and 120 words.
- If the data shows a problem, provide one practical recommendation.
- Write like an executive business analyst.

Example style:

"There are currently 10 complaint tickets. Complaints are the most common issue being reported by customers. I recommend reviewing high-priority complaint cases first and analyzing recurring issues to reduce future complaint volume."
"""

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]