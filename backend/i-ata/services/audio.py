import moviepy.editor as mp
import os

class MovieEditor:
    def __init__(self):
        pass

    def create_audio(self, direc, path, name):
        audio = mp.AudioFileClip(path)

        audio_path = os.path.join(direc, f'{name}.wav')
        audio.write_audiofile(audio_path)

        return audio_path

    def create_file(self, file, content):
        #get current path
        current = os.path.dirname(os.path.abspath(__file__))
        parent = os.path.dirname(current)
        temp_dir = os.path.join(parent, 'temp')

        if not os.path.exists(temp_dir):
            os.mkdir(temp_dir)

        temp_file_path = os.path.join(temp_dir, file.filename)

        if os.path.exists(temp_file_path):
            return os.path.join(temp_dir, f'{file.filename}.wav')
        else:
            with open(temp_file_path, 'wb+') as temp_file:
                temp_file.write(content)
            audio = self.create_audio(temp_dir, temp_file_path, file.filename)
            
            return audio
        


