import time
import uuid
import json

from fastapi import FastAPI, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .services.audio import MovieEditor
from .services.google import Genai
from .services.azure import Azure
from .models.model import AAAA, AtaSchema

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://ambitious-wave-0c0f5ad0f.1.azurestaticapps.net/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: Implementar um banco de dados para armazenar os arquivos(Redis -> Mongo)
file_storage = {}


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    print(f'Execution time: {process_time} seconds')
    print(f'Execution time: {process_time / 60} minutes')
    return response

@app.get('/health')
def point_check():
    return "check point"

@app.post('/video_transcription')
async def video_transcription(file: UploadFile):
    content = await file.read()

    editor = MovieEditor()
    audio_path = editor.create_file(file, content)

    if audio_path not in list(file_storage.values()):
        file_id = str(uuid.uuid4())
        file_storage[file_id] = audio_path
    else:
        for key, value in file_storage.items():
            if value == audio_path:
                file_id = key
                break
    
    return {"file_id": file_id}
    
@app.get('/models')
def models():
    with open("i-ata/utils/ata_models.json", 'r', encoding='utf-8') as file:
        models = json.load(file)

    return models


@app.post('/home_azure')
async def home_video_azure(file: AtaSchema):
    audio_path = file_storage.get(file.file_id)


    azure = Azure()
    response_azure = azure.audio_transcription(file, audio_path)

    google_client = Genai()

    response_genai = google_client.generate_content(response_azure, file.model)
    
    return {"response": response_genai.candidates[0].content.parts[0].text}
