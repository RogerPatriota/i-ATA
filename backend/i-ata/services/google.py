from google import genai
import os, dotenv
from urllib3 import response

dotenv.load_dotenv()
genai_key = os.getenv("GEMINI_AI_KEY")

client = genai.Client(api_key=genai_key)

class Genai:
    
    def generate_content(self, transcript, modelo_ata):
  
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=f'''

                Assunto: Criação de Ata de Reunião a partir de Transcrição

                Persona: Você é um assistente especialista em comunicação corporativa e documentação de projetos.

                Objetivo: Analisar a transcrição de uma conversa informal fornecida abaixo e transformá-la em uma ata de reunião formal e bem estruturada.
                transcrição: {transcript}

                Estrutura da Ata:
                O componente JSON deve obrigatoriamente conter as seguintes seções: {modelo_ata}

                Formato de Saída:
                A resposta deve ser apenas o JSON puro, sem blocos de código, sem markdown, sem aspas, sem explicações ou texto adicional. Apenas o objeto JSON.
                Exemplo de resposta dentro do JSON: "titulo": ".....", "objetivo": "...."

                Instruções Adicionais:
                    - Traduza gírias e linguagem coloquial para termos profissionais e objetivos.
                    - Matenha o texto em portugues - brasil
            '''            
        )

        return response