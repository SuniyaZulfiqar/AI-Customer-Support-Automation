from src.database.connection import get_connection


def insert_dataframe(data):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("DELETE FROM customer_analysis")

    for _, row in data.iterrows():

        cursor.execute(
            """
            INSERT INTO customer_analysis
            (
                id,
                customer_name,
                customer_email,
                message,
                category,
                sentiment,
                urgency,
                response,
                ticket_status,
                assigned_to,
                created_at
            )

            VALUES
            (
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s
            )
            """,
            (
                int(row["id"]),
                row["customer_name"],
                row["customer_email"],
                row["message"],
                row["category"],
                row["sentiment"],
                row["urgency"],
                row["response"],
                row["ticket_status"],
                row["assigned_to"],
                row["created_at"],
            ),
        )

    connection.commit()

    cursor.close()
    connection.close()

    print(f"✅ Inserted {len(data)} records into PostgreSQL.")