from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.routes import persona

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Personas",
    description="API RESTful para gestion de datos basicos de personas.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    persona.router,
    prefix="/api/v1"
)

@app.get("/")
def health_check():

    return {
        "status": "ok",
        "mensaje": "API funcionando"
    }