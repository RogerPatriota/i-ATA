import requests
import os, dotenv
from ..models.model import AtaSchema

dotenv.load_dotenv()

az_region = os.getenv("SERVICE_REGION")
az_st_key = os.getenv("SPEECH_TO_TEXT_KEY")

class Azure():
    def __init__(self):
        self.key = az_st_key
        self.region = az_region

    def audio_transcription(self, file: AtaSchema, audio_path):

        file_name = f"{file.file_id}.wav"

        url = f'https://{az_region}.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15'

        header = {
            "Ocp-Apim-Subscription-Key": az_st_key
        }
        
        with open(audio_path, 'rb') as audio_file:
            files = {
                "audio": (file_name, audio_file, 'audio/wav'),
                "definition": ('', '{"locales":["pt-BR"]}', 'application/json')
            }
            response = requests.post(url, headers=header, files=files)

        if response.status_code == 200:
            response_text = response.json()["combinedPhrases"][0]["text"]
            return response_text
        else:
            return f"Erro: {response.json()}"