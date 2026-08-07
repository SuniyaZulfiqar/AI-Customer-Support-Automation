print("✅ NEW analytics.py loaded")
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


# ==========================
# Category Distribution
# ==========================

def get_category_distribution(category=None, urgency=None, status=None):

    conn = get_connection()
    cur = conn.cursor()

    where, params = build_where_clause(category, urgency, status)

    cur.execute(
        f"""
        SELECT
            category,
            COUNT(*)
        FROM customer_analysis_new
        {where}
        GROUP BY category
        ORDER BY COUNT(*) DESC
        """,
        params,
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "category": row[0],
            "count": row[1],
        }
        for row in rows
    ]


# ==========================
# Complaint Trend
# ==========================

def get_complaint_trend(category=None, urgency=None, status=None):

    conn = get_connection()
    cur = conn.cursor()

    where, params = build_where_clause(category, urgency, status)

    cur.execute(
        f"""
        SELECT
            DATE(created_at),
            COUNT(*)
        FROM customer_analysis_new
        {where}
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
        """,
        params,
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "date": str(row[0]),
            "complaints": row[1],
        }
        for row in rows
    ]


# ==========================
# Recent Tickets
# ==========================

def get_recent_tickets(
    category=None,
    urgency=None,
    status=None,
    page=1,
    limit=10,
):
    conn = get_connection()
    cur = conn.cursor()

    where, params = build_where_clause(category, urgency, status)

    offset = (page - 1) * limit

    # Get paginated tickets
    cur.execute(
        f"""
        SELECT
            customer_name,
            category,
            sentiment,
            urgency,
            ticket_status
        FROM customer_analysis_new
        {where}
        ORDER BY created_at DESC
        LIMIT %s OFFSET %s
        """,
        params + [limit, offset],
    )

    rows = cur.fetchall()

    # Get total AFTER filters
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where}
        """,
        params,
    )

    total = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {
        "tickets": [
            {
                "customer": row[0],
                "category": row[1],
                "sentiment": row[2],
                "urgency": row[3],
                "status": row[4],
            }
            for row in rows
        ],
        "total": total,
        "page": page,
        "limit": limit,
    }

def get_sentiment_distribution(category=None, urgency=None, status=None):

    conn = get_connection()
    cur = conn.cursor()

    where, params = build_where_clause(category, urgency, status)

    cur.execute(
        f"""
        SELECT
            sentiment,
            COUNT(*)
        FROM customer_analysis_new
        {where}
        GROUP BY sentiment
        ORDER BY COUNT(*) DESC
        """,
        params,
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "name": row[0],
           "value": row[1],
        }
        for row in rows
    ]


def get_urgency_distribution(category=None, urgency=None, status=None):

    conn = get_connection()
    cur = conn.cursor()

    where, params = build_where_clause(category, urgency, status)

    cur.execute(
        f"""
        SELECT
            urgency,
            COUNT(*)
        FROM customer_analysis_new
        {where}
        GROUP BY urgency
        ORDER BY COUNT(*) DESC
        """,
        params,
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "name": row[0],
            "value": row[1],
        }
        for row in rows
    ]


def get_status_distribution(category=None, urgency=None, status=None):

    conn = get_connection()
    cur = conn.cursor()

    where, params = build_where_clause(category, urgency, status)

    cur.execute(
        f"""
        SELECT
            ticket_status,
            COUNT(*)
        FROM customer_analysis_new
        {where}
        GROUP BY ticket_status
        ORDER BY COUNT(*) DESC
        """,
        params,
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
             "name": row[0],
             "value": row[1],
        }
        for row in rows
    ]

def get_top_categories(category=None, urgency=None, status=None):

    conn = get_connection()
    cur = conn.cursor()

    where, params = build_where_clause(category, urgency, status)

    cur.execute(
        f"""
        SELECT
            category,
            COUNT(*) AS total
        FROM customer_analysis_new
        {where}
        GROUP BY category
        ORDER BY total DESC
        """,
        params,
    )

    rows = cur.fetchall()

    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where}
        """,
        params,
    )

    total = cur.fetchone()[0]

    cur.close()
    conn.close()

    return [
        {
            "category": row[0],
            "count": row[1],
            "percentage": round((row[1] / total) * 100, 1) if total else 0,
        }
        for row in rows
    ]