import time
import uuid
import json

from fastapi import FastAPI, Request, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from .services.audio import MovieEditor
from .services.google import Genai
from .services.azure import Azure
from .models.model import AtaSchema

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

app.mount('/static', StaticFiles(directory='static'), name='static')
template = Jinja2Templates(directory="templates")

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

@app.post('/generate_ata')
def generate_ata(file: AtaSchema):
    audio_path = file_storage.get(file.file_id)

    google_client = Genai('gemini-1.5-flash')
    audio_genai = google_client.upload_content(audio_path)

    response = google_client.generate_content(
        f'Com base no audio enviado, ecreva uma ATA da reunião. Essa ATA deve contar os seguintes topicos: {file.model}.',
        audio_genai
        )
    
    return {"response": response.text}


@app.post('/home_azure')
async def home_video_azure(file: AtaSchema):
    audio_path = file_storage.get(file.file_id)

    azure = Azure()
    response = azure.audio_transcription(file, audio_path)
    
    return {"response": response}
    
    
    
    
    '''
    with open('temp_video_midia.mp4', 'wb') as temp_file:
        temp_file.write(content)
    
    audio = mp.AudioFileClip('temp_video_midia.mp4')
    audio.write_audiofile('temp_audio.wav')

    url = f'https://{az_region}.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2024-11-15'

    header = {
        "Content-Type": "multipart/form-data",
        "Ocp-Apim-Subscription-Key": az_st_key
    }

    files = {
        "audio": (file.filename, open('temp_audio.wav', 'rb'), 'audio/wav'),
        "definition": ('', '{"locales":["pt-BR"]}', 'application/json')
    }

    response = request.post(url, header=header, file=files)

    text = response.json().get("combinedPhrases", [])'''
