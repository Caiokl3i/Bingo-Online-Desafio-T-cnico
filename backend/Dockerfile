# Configuração da imagem Docker otimizada para Node.js com suporte a SQLite.

FROM node:22-alpine

# Instala compiladores nativos necessários para o driver do SQLite.
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copia as definições de dependências e instala os pacotes.
COPY package*.json ./
RUN npm install

# Copia o restante do código fonte para o container.
COPY . .

EXPOSE 3000

# Comando de inicialização apontando para o entrypoint do servidor.
CMD ["node", "src/server.js"]