import time
import uuid
from fastapi import FastAPI, Request, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from .services.audio import MovieEditor
from .services.google import Genai
from .services.azure import Azure

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    

@app.post('/home')
async def home_video(request: Request, file: UploadFile):
    content = await file.read()

    editor = MovieEditor()
    audio_path = editor.create_file(file, content)

    google_client = Genai('gemini-1.5-flash')
    audio_genai = google_client.upload_content(audio_path)

    response = google_client.generate_content(
        'Com base no audio, escreva uma ATA da reunião. Essa ATA deve contar os seguintes topicos: contexto, topicos da reunia, discussão, porximas acoes, responda no formato HTML',
        audio_genai
        )
    
    content_html =  f'''
    {response.text}
    '''
    return HTMLResponse(content=content_html)

    template.TemplateResponse(
        request=request, name='upload.html', context={'file': file, 'response': response}
    )

@app.post('/home_azure')
async def home_video_azure(request: Request, file: UploadFile):
    content = await file.read()

    audio = MovieEditor()
    audio_path = audio.create_file(file, content)

    azure = Azure()
    response= azure.audio_transcription(file, audio_path)


    html_content = f"""
        <html>
            <head>
                <title>ATA GERADA</title>
            </head>
            <body>
                <h1>{response}</h1>
            </body>
        </html>
    """
    
    return HTMLResponse(content=html_content, status_code=200)

    template.TemplateResponse(
        request=request, name='upload.html', context={'file': file, 'response': response}
    )
    
    
    
    
    
    
    
    
    
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
