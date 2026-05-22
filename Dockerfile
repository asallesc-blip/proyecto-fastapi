# Imagen oficial de Node.js >=18
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar paquetes
RUN npm install

# Copiar todo el código
COPY . .

# Puerto del servidor de desarrollo
EXPOSE 5173

# Comando para iniciar
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]