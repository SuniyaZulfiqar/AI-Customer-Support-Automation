import pandas as pd
from fastapi.responses import FileResponse
from database.connection import get_connection


def get_report_data():
    conn = get_connection()

    query = """
    SELECT *
    FROM customer_analysis_new
    ORDER BY id DESC;
    """

    df = pd.read_sql(query, conn)
    conn.close()

    return {
        "total_reports": len(df),
        "reports": df.to_dict(orient="records")
    }


def get_report_history():
    conn = get_connection()

    query = """
    SELECT
        id,
        customer_name,
        category,
        urgency,
        status,
        created_at
    FROM customer_analysis_new
    ORDER BY id DESC
    LIMIT 20;
    """

    df = pd.read_sql(query, conn)
    conn.close()

    return {
        "reports": df.to_dict(orient="records")
    }


def export_csv():
    conn = get_connection()

    df = pd.read_sql(
        "SELECT * FROM customer_analysis_new",
        conn,
    )

    conn.close()

    filename = "customer_report.csv"

    df.to_csv(filename, index=False)

    return FileResponse(
        filename,
        media_type="text/csv",
        filename=filename,
    )


def export_excel():
    conn = get_connection()

    df = pd.read_sql(
        "SELECT * FROM customer_analysis_new",
        conn,
    )

    conn.close()

    filename = "customer_report.xlsx"

    df.to_excel(filename, index=False)

    return FileResponse(
        filename,
        filename=filename,
    )