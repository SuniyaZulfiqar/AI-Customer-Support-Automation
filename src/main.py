from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import requests

from src.services.ai_classifier import classify_message
from src.services.ai_copilot import ask_database
from src.database.dashboard import get_dashboard_data
from src.services.dashboard import get_dashboard_stats
import src.services.analytics as analytics
from src.services.executive_summary import generate_summary
from src.services.analytics import get_top_categories
from src.services.predictive_ai import predictive_ai

app = FastAPI(
    title="AI Customer Support API",
    description="AI-powered Customer Support Automation using Ollama + PostgreSQL",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Request Models
# ==========================

class CustomerMessage(BaseModel):
    customer_name: str
    customer_email: str
    message: str


class CopilotQuestion(BaseModel):
    question: str


# ==========================
# Home
# ==========================

@app.get("/")
def home():
    return {
        "message": "🚀 AI Customer Support API is running successfully!"
    }


# ==========================
# Customer Message Analysis
# ==========================

@app.post("/analyze")
def analyze_message(data: CustomerMessage):

    print("Incoming request:", data)


    ai_response = classify_message(data.message)

    print("AI Response:", ai_response)


    clean_response = (
        ai_response
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        result = json.loads(clean_response)

        result["customer_name"] = data.customer_name
        result["customer_email"] = data.customer_email
        result["message"] = data.message

        category = result.get("category", "")

        if category == "Complaint":
            result["response"] = "Escalate to Manager"

        elif category == "Sales":
            result["response"] = "Forward to Sales Team"

        elif category == "Technical Support":
            result["response"] = "Forward to Technical Support"

        elif category == "Billing":
            result["response"] = "Forward to Billing Team"

        elif category == "Refund":
            result["response"] = "Forward to Refund Department"

        elif category == "Order":
            result["response"] = "Forward to Order Management Team"

        elif category == "Inquiry":
            result["response"] = "Forward to Information Desk"

        elif category == "Feedback":
            result["response"] = "Forward to Customer Experience Team"


        else:
            result["response"] = "Handle as General Inquiry"

        return result

    except json.JSONDecodeError:

        return {
            "error": "AI returned invalid JSON",
            "raw_response": clean_response
        }


# ==========================
# n8n Workflow
# ==========================

@app.post("/workflow")
def workflow(data: CustomerMessage):

    response = requests.post(
        "http://localhost:5678/webhook-test/customer-support",
        json={
            "customer_name": data.customer_name,
            "customer_email": data.customer_email,
            "message": data.message
        }
    )

    print("Status:", response.status_code)
    print("Response:", response.text)

    return {
        "status_code": response.status_code,
        "response": response.text
    }

# ==========================
# AI SQL Copilot
# ==========================

@app.post("/copilot")
def copilot(data: CopilotQuestion):

    result = ask_database(data.question)

    return result


# ==========================
# Health Check
# ==========================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "AI Customer Support API",
        "version": "2.0.0"
    }


from fastapi import Query

@app.get("/dashboard")
def dashboard(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
):
    return get_dashboard_stats(category, urgency, status)

from fastapi import Query

@app.get("/analytics/category")
def analytics_category(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
):
    return analytics.get_category_distribution(
        category,
        urgency,
        status,
    )


@app.get("/analytics/complaint-trend")
def complaint_trend(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
):
    return analytics.get_complaint_trend(
    category,
    urgency,
    status,
)

from fastapi import Query

@app.get("/analytics/recent-tickets")
def recent_tickets(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
    page: int = Query(default=1),
    limit: int = Query(default=10),
):
    print(analytics.__file__)
    print(analytics.get_recent_tickets)

    return analytics.get_recent_tickets(
        category,
        urgency,
        status,
        page,
        limit,
    )

from fastapi import Query

from fastapi import Query

@app.get("/executive-summary")
def executive_summary(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
):
    return generate_summary(category, urgency, status)

@app.get("/analytics/business-insights")
def business_insights():

    return {
        "insights": [
            "Complaint volume is the highest category.",
            "High-priority tickets require immediate attention.",
            "Resolved tickets exceed open tickets.",
            "Negative sentiment is the dominant customer emotion."
        ]
    }

from fastapi import Query

@app.get("/analytics/sentiment")
def sentiment_distribution(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
):
    return analytics.get_sentiment_distribution(
        category,
        urgency,
        status,
    )


@app.get("/analytics/urgency")
def urgency_distribution(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
):
    return analytics.get_urgency_distribution(
        category,
        urgency,
        status,
    )


@app.get("/analytics/status")
def status_distribution(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
):
    return analytics.get_status_distribution(
        category,
        urgency,
        status,
    )

@app.get("/analytics/top-categories")
def top_categories(
    category: str | None = Query(default=None),
    urgency: str | None = Query(default=None),
    status: str | None = Query(default=None),
):
    return get_top_categories(
        category,
        urgency,
        status,
    )

@app.get("/analytics/predictive-ai")
def predictive():

    return predictive_ai()

# ==========================
# REPORTS
# ==========================

from src.services.reports import (
    get_report_history,
    export_csv,
    export_excel,
)

@app.get("/reports/history")
def report_history():
    return get_report_history()


@app.get("/reports/export/csv")
def download_csv():
    return export_csv()


@app.get("/reports/export/excel")
def download_excel():
    return export_excel()

from src.services.reports import get_report_data

@app.get("/reports/test")
def reports_test():
    return get_report_data()