import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def classify_message(message: str):
    prompt = f"""
You are an AI customer support classifier.

Analyze the customer message and return ONLY valid JSON.

Customer message:
{message}

Return exactly:

{{
  "category": "Complaint",
  "sentiment": "Negative",
  "urgency": "High"
}}

Allowed category values:
Complaint, Refund, Billing, Sales, Technical Support, Order, General Inquiry

Allowed sentiment values:
Positive, Neutral, Negative

Allowed urgency values:
Low, Medium, High
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content.strip()