from src.database.connection import get_connection


def predictive_ai():

    conn = get_connection()
    cur = conn.cursor()

    # Total tickets
    cur.execute("SELECT COUNT(*) FROM customer_analysis_new")
    total = cur.fetchone()[0]

    # High priority
    cur.execute("""
        SELECT COUNT(*)
        FROM customer_analysis_new
        WHERE urgency='High'
    """)
    high = cur.fetchone()[0]

    # Negative sentiment
    cur.execute("""
        SELECT COUNT(*)
        FROM customer_analysis_new
        WHERE sentiment='Negative'
    """)
    negative = cur.fetchone()[0]

    # Most common category
    cur.execute("""
        SELECT category, COUNT(*)
        FROM customer_analysis_new
        GROUP BY category
        ORDER BY COUNT(*) DESC
        LIMIT 1
    """)
    top = cur.fetchone()

    cur.close()
    conn.close()

    negative_rate = round((negative / total) * 100, 1) if total else 0

    insights = [
        f"Complaint volume is stable with {total} total tickets.",
        f"Most frequent issue is '{top[0]}'.",
        f"{high} high-priority tickets require immediate attention.",
        f"{negative_rate}% of customers expressed negative sentiment.",
        "Recommendation: Allocate additional staff to the busiest category."
    ]

    return {
        "insights": insights
    }