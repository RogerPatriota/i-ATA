import time
from fastapi import FastAPI, Request, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .services.audio import MovieEditor
from .services.google import Genai
from .services.azure import Azure

import moviepy.editor as mp
import google.generativeai as genai
import os, dotenv

app = FastAPI()

dotenv.load_dotenv()

# GOOGLE KEYS
genai_key = os.getenv("GEMINI_AI_KEY")
genai.configure(api_key=genai_key)

#AZURE KEYS
az_region = os.getenv("SERVICE_REGION")
az_st_key = os.getenv("SPEECH_TO_TEXT_KEY")


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

@app.get('/', response_class=HTMLResponse)
async def root(request: Request):
    return template.TemplateResponse(
        request=request, name='home.html'
    )

@app.post('/home')
async def home_video(request: Request, file: UploadFile):
    content = await file.read()

    editor = MovieEditor()
    audio_path = editor.create_file(file, content)

    google_client = Genai('gemini-1.5-flash')
    audio_genai = google_client.upload_content(audio_path)

    response = google_client.generate_content(
        'Resumir o áudio como uma ATA de reunião, responda em formato HTML',
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
