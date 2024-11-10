from pydantic import BaseModel
import uuid
from datetime import datetime

class FieldCreateModel(BaseModel):
    name: str
    description: str


class FieldModel(FieldCreateModel):
    id: uuid.UUID
    created_at: datetime
    name: str
    description: str
