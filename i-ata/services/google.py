from google.generativeai import genai
import os, dotenv

dotenv.load_dotenv()

genai_key = os.getenv("GENAI_AI_KEY")
genai.configure(api_key=genai_key)

print(genai_key)