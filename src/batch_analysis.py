import pandas as pd
import json

from services.ai_classifier import classify_message
from database.insert import insert_dataframe