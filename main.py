import google.generativeai as genai
import moviepy.editor as mp
from pydub import AudioSegment
from dotenv import load_dotenv
import os
import timeit

exec_start = timeit.default_timer()

load_dotenv()
genai_key = os.getenv("GEMINI_AI_KEY")
genai.configure(api_key=genai_key)

video_name = 'MSUC Automation - Alinhamento técnico-20240924_142201-Meeting Recording 1.mp4'
video_path = './assets/'
full_transcript = ''

#extract audio from the video and save into a file
clip = mp.VideoFileClip(video_path + video_name)
clip.audio.write_audiofile(video_path + 'audio.wav')

# save the audio in a variable
audio = AudioSegment.from_wav(video_path + 'audio.wav')

# upload audio to he gemini server
audio_file = genai.upload_file(path=(video_path + 'audio.wav'))
# create prompt
prompt = 'Summarize the audio as a meeting note'

model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content([prompt, audio_file])

exec_end = timeit.default_timer()

print(response.text)
print(response.usage_metadata)

print('program execution time: {:.2f}'.format(exec_end - exec_start))