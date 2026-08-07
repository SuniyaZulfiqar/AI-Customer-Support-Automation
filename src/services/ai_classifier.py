import ollama

def classify_message(message):

    prompt = f"""
You are an AI customer support classifier.

Your job is to classify the customer's message.

Choose EXACTLY ONE category from this list:

- Complaint
- Billing
- Refund
- Sales
- Technical Support
- Order
- Inquiry
- Feedback

Category Rules:

Complaint:
Customer is unhappy with service or product quality.

Billing:
Payment failed, charged twice, invoice, subscription payment, billing problem.

Refund:
Customer explicitly wants their money back or asks for a refund.

Sales:
Pricing, upgrade, purchase, subscription plans, product information before buying.

Technical Support:
Login issue, password reset, website error, application bug, technical problem.

Order:
Shipping, tracking, delivery, order status.

Inquiry:
General question, business hours, policies, company information.

Feedback:
Suggestion, compliment, appreciation, review.

Also determine:

Sentiment:
Positive
Neutral
Negative

Urgency:
Low
Medium
High

Return ONLY valid JSON.

Example:

{{
  "category":"Billing",
  "sentiment":"Negative",
  "urgency":"High",
  "response":"Forward to Billing Team"
}}

Customer message:

\"\"\"{message}\"\"\"
"""

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    print(response["message"]["content"])

    return response["message"]["content"]