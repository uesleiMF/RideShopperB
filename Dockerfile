# Etapa 1: Construção
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Etapa 2: Execução
FROM node:18

WORKDIR /app

COPY --from=builder /app /app

RUN npm run build

CMD ["node", "dist/app.js"]
