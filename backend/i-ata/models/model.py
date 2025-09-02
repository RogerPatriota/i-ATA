from pydantic import BaseModel

class AtaSchema(BaseModel):
    file_id: str
    model: dict

class Test(BaseModel):
    text: str
    model: dict
