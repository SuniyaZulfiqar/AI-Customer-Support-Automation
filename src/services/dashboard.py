from database.connection import get_connection


def get_dashboard_stats(category=None, urgency=None, status=None):

    conn = get_connection()
    cur = conn.cursor()

    where_clause = "WHERE 1=1"
    params = []

    if category:
        where_clause += " AND category=%s"
        params.append(category)

    if urgency:
        where_clause += " AND urgency=%s"
        params.append(urgency)

    if status:
        where_clause += " AND ticket_status=%s"
        params.append(status)

    # Total Tickets
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where_clause}
        """,
        params,
    )
    total = cur.fetchone()[0]

    # Complaints
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where_clause} AND category='Complaint'
        """,
        params,
    )
    complaints = cur.fetchone()[0]

    # Open Tickets
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where_clause} AND ticket_status='Open'
        """,
        params,
    )
    open_tickets = cur.fetchone()[0]

    # Closed Tickets
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where_clause} AND ticket_status='Resolved'
        """,
        params,
    )
    closed_tickets = cur.fetchone()[0]

    # High Priority
    cur.execute(
        f"""
        SELECT COUNT(*)
        FROM customer_analysis_new
        {where_clause} AND urgency='High'
        """,
        params,
    )
    high_priority = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {
        "total_tickets": total,
        "complaints": complaints,
        "open_tickets": open_tickets,
        "closed_tickets": closed_tickets,
        "high_priority": high_priority,
    }