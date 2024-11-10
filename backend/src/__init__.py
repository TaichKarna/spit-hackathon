from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.main import initdb
from src.auth.routers import auth_router
from src.channels.routers import channel_router
from src.fields.routers import field_router
from fastapi.middleware.cors import CORSMiddleware

version = 'v1'

origins = [
    "*"
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("server is starting")
    await initdb()
    print("connected to database")
    yield
    print("server is stopping")

app = FastAPI(
    title='SensorGrid',
    description='A restful API for IoT devices to store data',
    version=version,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router=auth_router,prefix='/api/{version}/auth', tags=["auth"])
app.include_router(channel_router, prefix="/api/v1/channels", tags=["channels"])
app.include_router(field_router, prefix="/api/v1/fields", tags=["fields"])

