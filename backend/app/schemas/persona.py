from pydantic import BaseModel, EmailStr, Field
from datetime import date, datetime
from typing import Optional

class PersonaBase(BaseModel):

    nombre: str = Field(..., min_length=2, max_length=100)

    apellido: str = Field(..., min_length=2, max_length=100)

    email: EmailStr

    telefono: Optional[str] = Field(None, max_length=20)

    fecha_nacimiento: Optional[date] = None


class PersonaCreate(PersonaBase):
    pass


class PersonaUpdate(BaseModel):

    nombre: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100
    )

    apellido: Optional[str] = Field(
        None,
        min_length=2,
        max_length=100
    )

    email: Optional[EmailStr] = None

    telefono: Optional[str] = None

    fecha_nacimiento: Optional[date] = None


class PersonaResponse(PersonaBase):

    id: int

    creado_en: datetime

    class Config:
        from_attributes = True