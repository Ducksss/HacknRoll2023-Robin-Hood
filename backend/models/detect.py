from pydantic import BaseModel, validator

class DetectIn(BaseModel):
    text: str = None

    @validator("text", always=True)
    def text_must_exist(cls, text):
        if not text:
            raise ValueError("text must not be None")
        return text
