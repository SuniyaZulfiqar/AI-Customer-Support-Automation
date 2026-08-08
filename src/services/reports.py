import io

import pandas as pd
from fastapi.responses import StreamingResponse

from src.database.connection import get_connection


def get_report_history():
    conn = get_connection()

    try:
        query = """
            SELECT
                id,
                customer_name,
                category,
                urgency,
                ticket_status AS status
            FROM customer_analysis_new
            ORDER BY id DESC
        """

        df = pd.read_sql(query, conn)

        return {
            "reports": df.to_dict(orient="records")
        }

    finally:
        conn.close()


def get_report_data():
    conn = get_connection()

    try:
        query = """
            SELECT *
            FROM customer_analysis_new
        """

        df = pd.read_sql(query, conn)

        return {
            "reports": df.to_dict(orient="records")
        }

    finally:
        conn.close()


def _get_export_dataframe():
    conn = get_connection()

    try:
        query = """
            SELECT *
            FROM customer_analysis_new
        """

        return pd.read_sql(query, conn)

    finally:
        conn.close()


def export_csv():
    df = _get_export_dataframe()

    csv_data = df.to_csv(index=False)

    return StreamingResponse(
        iter([csv_data]),
        media_type="text/csv",
        headers={
            "Content-Disposition": (
                "attachment; filename=customer_report.csv"
            )
        },
    )


def export_excel():
    df = _get_export_dataframe()

    output = io.BytesIO()

    with pd.ExcelWriter(
        output,
        engine="openpyxl"
    ) as writer:

        df.to_excel(
            writer,
            index=False,
            sheet_name="Customer Support"
        )

    output.seek(0)

    return StreamingResponse(
        output,
        media_type=(
            "application/vnd.openxmlformats-officedocument."
            "spreadsheetml.sheet"
        ),
        headers={
            "Content-Disposition": (
                "attachment; filename=customer_report.xlsx"
            )
        },
    )