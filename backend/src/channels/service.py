# src/channels/service.py
from src.channels.models import Channel
from sqlmodel.ext.asyncio.session import AsyncSession

class ChannelService:
    async def create_channel(self, channel_data, session: AsyncSession):
        # Create a new Channel instance
        channel = Channel(**channel_data.dict())
        session.add(channel)
        await session.commit()
        await session.refresh(channel)
        return channel

    async def get_channel_by_id(self, channel_id: str, session: AsyncSession):
        return await session.get(Channel, channel_id)
