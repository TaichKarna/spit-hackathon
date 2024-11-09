# src/channels/schemas.py
from pydantic import BaseModel
from typing import Optional

class ChannelCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ChannelResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
