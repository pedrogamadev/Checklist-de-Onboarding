# Checklist de Onboarding - Projeto Fullstack

Este repositório contém o projeto prático de validação técnica, composto por Backend (Node.js), Frontend (React) e Banco de Dados (Postgres), orquestrados via Docker Compose.

## 🚀 Visão Geral

O sistema é um gerenciador de tarefas (To-Do List) simples, onde é possível listar, criar, atualizar e remover tarefas. O foco principal é a demonstração de competências em:
- Containerização com **Docker**.
- Orquestração com **Docker Compose**.
- Integração de microsserviços.
- Configuração de ambiente de desenvolvimento.

## 🛠️ Stack Tecnológico

- **Backend**: Node.js, Express, Prisma ORM.
- **Frontend**: React, Vite, TypeScript.
- **Banco de Dados**: PostgreSQL 16 (Alpine).
- **Infraestrutura**: Docker, Docker Compose.

## 🏃 Como Rodar (Docker - Recomendado)

Este é o método padrão para a **Atividade 3**.

1. **Pré-requisitos**: Docker e Docker Compose instalados.
2. **Execute**:
   ```bash
   docker compose up --build
   ```
3. **Acesse**:
   - Aplicação: [http://localhost:5173](http://localhost:5173)
   - API Direta: [http://localhost:3000/tasks](http://localhost:3000/tasks)
   - API via Proxy: [http://localhost:5173/api/tasks](http://localhost:5173/api/tasks)

Para mais detalhes da Atividade 3, consulte [docs/atividade3/README.md](docs/atividade3/README.md).

## 💻 Como Rodar (Local - Sem Docker)

Caso precise rodar localmente (Node.js direto na máquina):

1. **Banco de Dados**: Suba um Postgres local na porta 5432 ou ajuste as configs.
2. **Backend**:
   - Crie `backend/.env` com `DATABASE_URL`.
   - `cd backend && npm install && npx prisma migrate dev && npm run dev`
3. **Frontend**:
   - Crie `frontend/.env` com `VITE_API_URL=http://localhost:3000`.
   - `cd frontend && npm install && npm run dev`

## 🔍 Checklist de Validação da Entrega

Execute os passos abaixo para garantir que tudo está funcionando:

1. [ ] `docker compose ps` mostra 3 containers (postgres, backend, frontend) com status "Up".
2. [ ] Backend aguarda Postgres ficar "healthy" antes de iniciar.
3. [ ] Frontend carrega tarefas sem erros no console (CORS/).
4. [ ] Persistência de dados funciona ao reiniciar containers.

## 📄 Evidências

Verifique a seção "Evidências para entrega" em [docs/atividade3/README.md](docs/atividade3/README.md) para saber exatamente o que printar.
