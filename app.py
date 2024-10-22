from fastapi import FastAPI, Request, UploadFile
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from test import video_cast

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')
template = Jinja2Templates(directory="templates")

@app.get('/', response_class=HTMLResponse)
async def root(request: Request):
    return template.TemplateResponse(
        request=request, name='home.html'
    )

@app.post('/home')
def home_video(request: Request, file: UploadFile):
    video_cast(file.file)

    return template.TemplateResponse(
        request=request, name='upload.html', context={'file': file}
    )
