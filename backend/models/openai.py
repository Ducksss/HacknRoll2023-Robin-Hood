from typing import Optional

from pydantic import BaseModel, validator


class CompletionIn(BaseModel):
    text: str = None
    context: Optional[str] = "letter"
    audience: Optional[str] = "general"
    formality: Optional[str] = "neutral"
    intent: Optional[str] = "inform"
    role: Optional[str] = None

    @validator("text", always=True)
    def text_must_exist(cls, text):
        if not text:
            raise ValueError("text must not be None")
        return text
