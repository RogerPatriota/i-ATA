import requests
import os, dotenv

dotenv.load_dotenv()

az_region = os.getenv("SERVICE_REGION")
az_st_key = os.getenv("SPEECH_TO_TEXT_KEY")

class Azure():
    def __init__(self):
        self.key = az_st_key
        self.region = az_region

    def audio_transcription(self, file, audio_path):
        url = f'https://{az_region}.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15'

        header = {
            "Content-Type": "multipart/form-data",
            "Ocp-Apim-Subscription-Key": az_st_key
        }

        file = {
            "audio": (file.filename, open(audio_path, 'rb'), 'audio/wav'),
            "definition": ('', '{"locales":["pt-BR"]}', 'application/json')
        }

        azure_response = requests.post(url, headers=header, files=file)

        response_text = azure_response.json()["combinedPhrases"][0]["text"]

        return response_text