from fastapi import APIRouter, Depends, HTTPException, status
from src.fields.schemas import FieldCreateModel, FieldModel
from src.fields.service import FieldService
from src.db.main import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
import uuid

field_router = APIRouter()
field_service = FieldService()

@field_router.post("/", response_model=FieldModel, status_code=status.HTTP_201_CREATED)
async def create_field(
    field_data: FieldCreateModel,
    session: AsyncSession = Depends(get_session)
):
    try:
        # Call the service to create the field
        new_field = await field_service.create_field(field_data, session)
        return new_field
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@field_router.get("/{field_id}", response_model=FieldModel)
async def get_field_by_id(
    field_id: uuid.UUID,
    session: AsyncSession = Depends(get_session)
):
    field = await field_service.get_field_by_id(field_id, session)
    if not field:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Field not found")
    return field

@field_router.get("/", response_model=list[FieldModel])
async def get_all_fields(
    session: AsyncSession = Depends(get_session)
):
    fields = await field_service.get_all_fields(session)
    return fields
