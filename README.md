# i-ATA

> Geração automática de atas de reunião a partir de gravações de áudio/vídeo.

## Visão Geral

O projeto **i-ATA** é composto por duas partes principais:
- **Backend**: API em Python utilizando FastAPI para processar arquivos, transcrever áudios e gerar atas com IA (Google Gemini e Azure Speech-to-Text).
- **Frontend**: Interface web desenvolvida em React + Vite para upload de arquivos, seleção de modelo de ata e visualização do resultado.

---

## Estrutura do Projeto

```
.
├── backend/   # API FastAPI, lógica de processamento e modelos
└── frontend/  # Aplicação React + Vite
```

---

## Instalação e Execução

### Backend (FastAPI)

1. Acesse a pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências (recomenda-se usar Python 3.12+):
   ```bash
   pip install poetry
   poetry install
   ```
3. Configure as variáveis de ambiente:
   - Copie `.ENV_EXAMPLE` para `.env` e preencha as chaves:
     - `GEMINI_AI_KEY` (Google Gemini)
     - `SERVICE_REGION` (Azure)
     - `SPEECH_TO_TEXT_KEY` (Azure)
4. Execute o servidor:
   ```bash
   fastapi dev i-ata/app.py
   ```

### Frontend (React + Vite)

1. Acesse a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O frontend estará disponível em [http://localhost:5173](http://localhost:5173)

---

## Como Usar

1. Faça upload do arquivo de áudio/vídeo da reunião.
2. Selecione o modelo de ata desejado (simple, medium, complex).
3. Aguarde o processamento e visualize/edite a ata gerada.

---

## Tecnologias Utilizadas

- **Backend:**
  - Python 3.12+
  - FastAPI
  - Google Generative AI (Gemini)
  - Azure Speech-to-Text
  - MoviePy, Pydub
- **Frontend:**
  - React 19 + Vite
  - TailwindCSS
  - Axios

---

## Licença

MIT
