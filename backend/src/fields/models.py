from sqlmodel import SQLModel, Field, Column
import uuid
from datetime import datetime, timezone
import sqlalchemy.dialects.postgresql as pg

class Field(SQLModel, table=True):
    __tablename__ = "fields"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        nullable=False,
        index=True,
        unique=True
    )
    name: str
    description: str
    created_at: datetime = Field(sa_column=Column(pg.TIMESTAMP, default=datetime.now))
