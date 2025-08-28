from google import genai
import os, dotenv

dotenv.load_dotenv()
genai_key = os.getenv("GEMINI_AI_KEY")

client = genai.Client(api_key=genai_key)

class Genai:
    
    def generate_content(self, transcript, modelo_ata):
  
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=f'''

                transcrição: {transcript}

                Assunto: Criação de Ata de Reunião a partir de Transcrição

                Persona: Você é um assistente especialista em comunicação corporativa e documentação de projetos.

                Objetivo: Analisar a transcrição de uma conversa informal fornecida abaixo e transformá-la em uma ata de reunião formal e bem estruturada.

                Formato de Saída:
                A saída deve ser apenas a estrutura HTML de um componente, sem as tags <html>, <head>, <style> ou <body>. Ele deve iniciar com uma div. 
                O componente deve ser limpo e semanticamente correto, pronto para ser inserido em uma página existente.

                Estrutura da Ata:
                O componente HTML deve obrigatoriamente conter as seguintes seções: {modelo_ata}

                Instruções Adicionais:

                Traduza gírias e linguagem coloquial para termos profissionais e objetivos.
                Matenha o texto em portugues - brasil
            '''            
        )


        return response