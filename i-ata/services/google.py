import google.generativeai as genai
import os, dotenv

dotenv.load_dotenv()

genai_key = os.getenv("GEMINI_AI_KEY")
genai.configure(api_key=genai_key)

class Genai:
    def __init__(self, model):
        self.model = model

    def upload_content(self, path):
        return genai.upload_file(path=path)
    
    def generate_content(self, prompt, file):
        model = genai.GenerativeModel(self.model)

        response = model.generate_content([prompt, file])

        return response