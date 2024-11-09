# src/channels/models.py
from sqlmodel import SQLModel, Field
import uuid

class Channel(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    description: str = ""
