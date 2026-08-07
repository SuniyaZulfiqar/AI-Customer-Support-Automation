from database.connection import get_connection


def get_dashboard_data():
    connection = get_connection()
    cursor = connection.cursor()

    dashboard = {}

    # Total Tickets
    cursor.execute("SELECT COUNT(*) FROM customer_analysis")
    dashboard["total_tickets"] = cursor.fetchone()[0]

    # Complaints
    cursor.execute("""
        SELECT COUNT(*)
        FROM customer_analysis_new
        WHERE category='Complaint'
    """)
    dashboard["complaints"] = cursor.fetchone()[0]

    # Open Tickets
    cursor.execute("""
        SELECT COUNT(*)
        FROM customer_analysis_new
        WHERE ticket_status='Open'
    """)
    dashboard["open_tickets"] = cursor.fetchone()[0]

    # Closed Tickets
    cursor.execute("""
        SELECT COUNT(*)
        FROM customer_analysis_new
        WHERE ticket_status='Closed'
    """)
    dashboard["closed_tickets"] = cursor.fetchone()[0]

    # High Priority
    cursor.execute("""
        SELECT COUNT(*)
        FROM customer_analysis_new
        WHERE urgency='High'
    """)
    dashboard["high_priority"] = cursor.fetchone()[0]

    cursor.close()
    connection.close()

    return dashboard