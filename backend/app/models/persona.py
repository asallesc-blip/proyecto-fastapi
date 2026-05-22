from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.sql import func

from app.database.database import Base

class Persona(Base):

    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String(100), nullable=False)

    apellido = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, index=True, nullable=False)

    telefono = Column(String(20), nullable=True)

    fecha_nacimiento = Column(Date, nullable=True)

    creado_en = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )