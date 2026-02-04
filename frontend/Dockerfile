# Imagem base leve para Node.js.
FROM node:22-alpine

WORKDIR /app

# Copia dependências primeiro para otimizar o cache de build.
COPY package*.json ./
RUN npm install

# Copia o código fonte da aplicação.
COPY . .

# Expõe a porta padrão do Vite.
EXPOSE 5173

# Inicia o servidor de desenvolvimento liberando acesso externo (--host).
CMD ["npm", "run", "dev", "--", "--host"]