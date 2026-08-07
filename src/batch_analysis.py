import pandas as pd
import json

from src.services.ai_classifier import classify_message
from src.database.insert import insert_dataframe