FROM node:18-alpine

WORKDIR /usr/app

# Dependências necessárias pro Prisma no Alpine
RUN apk add --no-cache openssl libc6-compat

# Instala deps primeiro (cache melhor)
COPY package*.json ./
RUN npm install

# Copia Prisma schema/migrations antes e gera o client no container
COPY prisma ./prisma
RUN npx prisma generate

# Agora copia o resto do projeto
COPY . .

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && npm run dev"
