from fastapi import APIRouter, HTTPException, Depends
from src.channels.schemas import ChannelCreate, ChannelResponse
from src.channels.service import ChannelService
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session

channel_router = APIRouter()
channel_service = ChannelService()

@channel_router.post("/channels", response_model=ChannelResponse, status_code=201)
async def create_channel(channel_data: ChannelCreate, session: AsyncSession = Depends(get_session)):
    channel = await channel_service.create_channel(channel_data, session)
    return channel

@channel_router.get("/channels/{channel_id}", response_model=ChannelResponse)
async def get_channel(channel_id: str, session: AsyncSession = Depends(get_session)):
    channel = await channel_service.get_channel_by_id(channel_id, session)
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    return channel
