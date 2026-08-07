import pandas as pd

from database.insert import insert_dataframe

# Load the generated dataset
df = pd.read_csv("../data/customer_analysis.csv")

# Insert into PostgreSQL
insert_dataframe(df)

print(f"✅ Successfully inserted {len(df)} records into PostgreSQL!")