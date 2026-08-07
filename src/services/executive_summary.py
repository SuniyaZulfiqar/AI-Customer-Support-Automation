from src.database.connection import get_connection


def build_where_clause(category=None, urgency=None, status=None):
    where = "WHERE 1=1"
    params = []

    if category:
        where += " AND category=%s"
        params.append(category)

    if urgency:
        where += " AND urgency=%s"
        params.append(urgency)

    if status:
        where += " AND ticket_status=%s"
        params.append(status)

    return where, params


def generate_summary(category=None, urgency=None, status=None):

    conn = get_connection()
    cur = conn.cursor()

    where, params = build_where_clause(category, urgency, status)

    # Total tickets
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where}
        """,
        params,
    )
    total = cur.fetchone()[0]

    # Complaints
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where}
        AND category='Complaint'
        """,
        params,
    )
    complaints = cur.fetchone()[0]

    # High Priority
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where}
        AND urgency='High'
        """,
        params,
    )
    high = cur.fetchone()[0]

    # Most common category
    cur.execute(
        f"""
        SELECT category, COUNT(*)
        FROM customer_analysis_new
        {where}
        GROUP BY category
        ORDER BY COUNT(*) DESC
        LIMIT 1
        """,
        params,
    )

    category_row = cur.fetchone()

    # Most common sentiment
    cur.execute(
        f"""
        SELECT sentiment, COUNT(*)
        FROM customer_analysis_new
        {where}
        GROUP BY sentiment
        ORDER BY COUNT(*) DESC
        LIMIT 1
        """,
        params,
    )

    sentiment_row = cur.fetchone()

    cur.close()
    conn.close()

    complaint_rate = (complaints / total * 100) if total else 0

    return {
        "summary": [
            f"📌 Total tickets processed: {total}.",
            f"⚠️ Complaints account for {complaint_rate:.1f}% of all tickets.",
            f"🔥 High priority tickets: {high}.",
            f"📂 Most common category: {category_row[0] if category_row else 'N/A'}.",
            f"😊 Overall customer sentiment: {sentiment_row[0] if sentiment_row else 'N/A'}.",
        ]
    }