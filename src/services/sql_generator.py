import ollama


def generate_sql(question: str):

    prompt = f"""
You are an expert PostgreSQL SQL developer.

You are generating SQL ONLY.

Database:
PostgreSQL

Schema:
public

Table:
customer_analysis_new

IMPORTANT:
Never include the database name in SQL.
Always query:

customer_analysis_new

or

public.customer_analysis_new

Columns:

id
customer_name
customer_email
message
category
sentiment
urgency
response
ticket_status
assigned_to
created_at

Rules:

1. Return ONLY SQL.
2. Never explain your answer.
3. Never use markdown.
4. Never wrap SQL in ``` blocks.
5. Use only the columns listed above.
6. If the user asks about complaints, refunds, sales, billing, technical support or orders, use the CATEGORY column.
7. If the user asks about urgency, use the URGENCY column.
8. If the user asks about customer names, use CUSTOMER_NAME.
9. If the user asks about dates, use CREATED_AT.
10. Prefer COUNT(*) over COUNT(id).
11. Never write ai_customer_support.customer_analysis_new.
12. Always use customer_analysis_new or public.customer_analysis_new.

Examples:

Question:
How many complaints do we have?

SQL:
SELECT COUNT(*) FROM customer_analysis_new
WHERE category='Complaint';

Question:
Show high priority tickets.

SQL:
SELECT *
FROM customer_analysis_new
WHERE urgency='High';

Question:
Show unresolved tickets.

SQL:
SELECT *
FROM customer_analysis_new
WHERE ticket_status='Open';

Question:
Which customers requested refunds?

SQL:
SELECT customer_name, message
FROM customer_analysis_new
WHERE category='Refund';

Generate SQL for this question:

{question}
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

    sql = response["message"]["content"]

    sql = (
        sql.replace("```sql", "")
           .replace("```", "")
           .strip()
    )

    return sql