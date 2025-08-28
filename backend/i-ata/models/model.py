from pydantic import BaseModel

class AtaSchema(BaseModel):
    file_id: str
    model: str

class AAAA(BaseModel):
    text: str
    model: str