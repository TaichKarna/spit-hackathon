from datetime import datetime, timezone
import uuid
from sqlmodel.ext.asyncio.session import AsyncSession
from src.fields.models import Field  # Only import model directly
from src.fields.schemas import FieldCreateModel  # Only import schema directly
from sqlalchemy.sql import text
from src.fields.schemas import FieldModel

class FieldService:
    async def create_field(self, field_data: FieldCreateModel, session: AsyncSession) -> Field:
        new_field = Field(
            id=uuid.uuid4(),
            name=field_data.name,
            description=field_data.description,
        )
        session.add(new_field)
        await session.commit()
        return FieldModel.from_orm(new_field)

    async def get_field_by_id(self, field_id: uuid.UUID, session: AsyncSession) -> Field:
        return await session.get(Field, field_id)

    
    async def get_all_fields(self, session: AsyncSession):
        result = await session.execute(text("SELECT * FROM fields"))
        fields = result.fetchall()
        return fields