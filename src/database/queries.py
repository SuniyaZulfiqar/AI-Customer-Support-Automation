from database.connection import get_connection


def execute_query(query: str):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(query)

    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    return [dict(zip(columns, row)) for row in rows]