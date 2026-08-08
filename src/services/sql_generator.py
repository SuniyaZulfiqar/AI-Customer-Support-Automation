import os
from groq import Groq


def generate_sql(question: str):

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not configured")

    client = Groq(api_key=api_key)

    prompt = f"""
You are an expert PostgreSQL SQL developer.

Your job is to convert the user's question into SQL.

Return SQL ONLY.

DATABASE:
PostgreSQL

SCHEMA:
public

TABLE:
customer_analysis_new

AVAILABLE COLUMNS:
- id
- customer_name
- customer_email
- message
- category
- sentiment
- urgency
- response
- ticket_status
- assigned_to
- created_at

IMPORTANT RULES:

1. Return ONLY valid PostgreSQL SQL.
2. Never explain the SQL.
3. Never use Markdown.
4. Never use ```sql.
5. Never use columns that are not listed above.
6. Always query customer_analysis_new.
7. You may use public.customer_analysis_new.
8. Never include a database name.
9. Never use ai_customer_support.customer_analysis_new.
10. Prefer COUNT(*) instead of COUNT(id).
11. For complaints, use category = 'Complaint'.
12. For refunds, use category = 'Refund'.
13. For sales, use category = 'Sales'.
14. For billing, use category = 'Billing'.
15. For technical support, use category = 'Technical Support'.
16. For orders, use category = 'Order'.
17. For inquiries, use category = 'Inquiry'.
18. For feedback, use category = 'Feedback'.
19. For urgency questions, use the urgency column.
20. For customer questions, use customer_name.
21. For date questions, use created_at.
22. For open/unresolved tickets, use ticket_status = 'Open'.
23. For closed/resolved tickets, use ticket_status = 'Closed'.
24. Always produce executable PostgreSQL.
25. Never invent tables or columns.

EXAMPLES:

Question:
How many tickets do we have?

SQL:
SELECT COUNT(*) FROM customer_analysis_new;

Question:
How many complaints do we have?

SQL:
SELECT COUNT(*)
FROM customer_analysis_new
WHERE category = 'Complaint';

Question:
How many high priority tickets are there?

SQL:
SELECT COUNT(*)
FROM customer_analysis_new
WHERE urgency = 'High';

Question:
Show high priority tickets.

SQL:
SELECT *
FROM customer_analysis_new
WHERE urgency = 'High';

Question:
How many open tickets do we have?

SQL:
SELECT COUNT(*)
FROM customer_analysis_new
WHERE ticket_status = 'Open';

Question:
How many closed tickets do we have?

SQL:
SELECT COUNT(*)
FROM customer_analysis_new
WHERE ticket_status = 'Closed';

Question:
Which customers requested refunds?

SQL:
SELECT customer_name, message
FROM customer_analysis_new
WHERE category = 'Refund';

Question:
What are the different categories?

SQL:
SELECT category, COUNT(*) AS ticket_count
FROM customer_analysis_new
GROUP BY category
ORDER BY ticket_count DESC;

Question:
What is the sentiment distribution?

SQL:
SELECT sentiment, COUNT(*) AS count
FROM customer_analysis_new
GROUP BY sentiment
ORDER BY count DESC;

Question:
What is the urgency distribution?

SQL:
SELECT urgency, COUNT(*) AS count
FROM customer_analysis_new
GROUP BY urgency
ORDER BY count DESC;

Question:
Which category has the most tickets?

SQL:
SELECT category, COUNT(*) AS ticket_count
FROM customer_analysis_new
GROUP BY category
ORDER BY ticket_count DESC
LIMIT 1;

Question:
Show the latest tickets.

SQL:
SELECT *
FROM customer_analysis_new
ORDER BY created_at DESC
LIMIT 10;

USER QUESTION:

{question}

Return ONLY the SQL query.
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You generate PostgreSQL SQL only. Never explain your answer."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0,
            max_tokens=500,
        )

        sql = response.choices[0].message.content

        if not sql:
            raise RuntimeError("Groq returned an empty response")

        sql = (
            sql
            .replace("```sql", "")
            .replace("```postgresql", "")
            .replace("```", "")
            .strip()
        )

        return sql

    except Exception as e:

        raise RuntimeError(f"Groq SQL generation failed: {str(e)}")