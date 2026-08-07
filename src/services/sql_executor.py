from database.queries import execute_query


def run_sql(sql: str):
    try:
        results = execute_query(sql)

        return {
            "success": True,
            "sql": sql,
            "results": results
        }

    except Exception as e:
        return {
            "success": False,
            "sql": sql,
            "error": str(e)
        }