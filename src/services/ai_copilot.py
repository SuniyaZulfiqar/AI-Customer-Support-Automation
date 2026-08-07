from services.sql_generator import generate_sql
from services.sql_executor import run_sql
from services.report_generator import generate_report


def ask_database(question: str):

    sql = generate_sql(question)

    execution = run_sql(sql)

    if execution["success"]:

        report = generate_report(
            question,
            execution["sql"],
            execution["results"]
        )

        return {
            "success": True,
            "answer": report,
            "sql": execution["sql"],
            "results": execution["results"]
        }

    return execution