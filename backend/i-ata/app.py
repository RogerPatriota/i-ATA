import time
import uuid
import json

from fastapi import FastAPI, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .services.audio import MovieEditor
from .services.google import Genai
from .services.azure import Azure
from .models.model import AtaSchema, Test

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

@app.get('/files')
def files():
    return {'files': file_storage}

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
async def home_video_azure(file: AtaSchema):
    audio_path = file_storage.get(file.file_id)

    model_ata_json = json.dumps(file.model, ensure_ascii=False)

    azure = Azure()
    response_azure = azure.audio_transcription(file, audio_path)

    google_client = Genai()

    response_genai = google_client.generate_content(response_azure, model_ata_json)

    json_ata = json.loads(response_genai.candidates[0].content.parts[0].text)
    
    return {"response": json_ata}


@app.post('/test/{id}')
def test_ata(place: Test):
    #google_client = Genai()

    #response_genai = google_client.generate_content(place.text, place.model)

    ata_json = "{\"Titulo\": \"Planejamento para Otimização de Processo Crítico\", \"Objetivo\": \"Apresentar e alinhar as próximas etapas para a otimização de um processo crítico e moroso, visando sua implementação até o final de setembro, em resposta a demandas de clientes e para aprimorar a eficiência operacional.\", \"Resumo dos pontos tratados\": \"1. **Contexto e Urgência:** Foi identificado um processo atual moroso e insustentável, que gera sobrecarga de trabalho e com histórico de reclamações de outros clientes. A urgência para otimização foi intensificada por um projeto específico. 2. **Prazo Estimado:** A meta é ter uma solução concreta e funcional implementada até o final de setembro. 3. **Próximas Etapas:** Será realizada uma melhoria no fluxo atual, que será compartilhada. O engajamento da equipe técnica para o desenvolvimento da solução está previsto para iniciar em agosto. O Process Owner (dono do processo) será envolvido em reuniões para fornecer sua opinião, validar o escopo e contribuir com sua expertise no processo.\"}"
    response = json.loads(ata_json)
    return {"response": response['Titulo']} 