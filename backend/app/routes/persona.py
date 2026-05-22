from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.models.persona import Persona
from app.schemas.persona import (
    PersonaCreate,
    PersonaUpdate,
    PersonaResponse
)

router = APIRouter(
    prefix="/personas",
    tags=["Personas"]
)

@router.post(
    "/",
    response_model=PersonaResponse,
    status_code=status.HTTP_201_CREATED
)
def crear_persona(
    persona: PersonaCreate,
    db: Session = Depends(get_db)
):

    existente = db.query(Persona).filter(
        Persona.email == persona.email
    ).first()

    if existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"El email '{persona.email}' ya esta registrado"
        )

    db_persona = Persona(**persona.model_dump())

    db.add(db_persona)

    db.commit()

    db.refresh(db_persona)

    return db_persona


@router.get("/", response_model=List[PersonaResponse])
def listar_personas(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):

    return db.query(Persona).offset(skip).limit(limit).all()


@router.get("/{persona_id}", response_model=PersonaResponse)
def obtener_persona(
    persona_id: int,
    db: Session = Depends(get_db)
):

    persona = db.query(Persona).filter(
        Persona.id == persona_id
    ).first()

    if not persona:
        raise HTTPException(
            status_code=404,
            detail="Persona no encontrada"
        )

    return persona


@router.put("/{persona_id}", response_model=PersonaResponse)
def actualizar_persona(
    persona_id: int,
    datos: PersonaUpdate,
    db: Session = Depends(get_db)
):

    persona = db.query(Persona).filter(
        Persona.id == persona_id
    ).first()

    if not persona:
        raise HTTPException(
            status_code=404,
            detail="Persona no encontrada"
        )

    for campo, valor in datos.model_dump(
        exclude_unset=True
    ).items():

        setattr(persona, campo, valor)

    db.commit()

    db.refresh(persona)

    return persona


@router.delete(
    "/{persona_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def eliminar_persona(
    persona_id: int,
    db: Session = Depends(get_db)
):

    persona = db.query(Persona).filter(
        Persona.id == persona_id
    ).first()

    if not persona:
        raise HTTPException(
            status_code=404,
            detail="Persona no encontrada"
        )

    db.delete(persona)

    db.commit()