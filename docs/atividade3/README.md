# Atividade 3: Integração com Docker Compose

Este documento descreve como configurar e rodar a aplicação integrando Backend, Frontend e Banco de Dados (Postgres) utilizando Docker Compose.

## Pré-requisitos

- Docker e Docker Compose instalados.
- Node.js instalado (para execução sem Docker).

## Estrutura de Pastas

- `backend/`: Código fonte do servidor (Node.js/Express/Prisma).
- `frontend/`: Código fonte da interface (React/Vite).
- `docker-compose.yml`: Orquestração dos containers.

## Configure as Variáveis de Ambiente

### Backend (`backend/.env`)

Crie ou edite o arquivo `backend/.env` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://task_user:postgres@postgres:5432/task_db?schema=public"
PORT=3000
```

> **Nota para execução sem Docker**: Se rodar localmente sem Docker, altere `postgres` para `localhost` na `DATABASE_URL`.

### Frontend (`frontend/.env`)

Crie ou edite o arquivo `frontend/.env` com o seguinte conteúdo:

```env
VITE_API_URL=http://backend:3000
```

> **Nota**: Esta URL é utilizada internamente na rede do Docker. Para acessos via browser na máquina host sem proxy configurado, pode haver limitações de resolução de nome `backend`. Certifique-se de que a aplicação está preparada para proxy ou ajuste conforme necessário.

## Executando com Docker Compose (Recomendado)

1. Na raiz do projeto, execute:
   ```bash
   docker compose up --build
   ```

2. Aguarde os serviços iniciarem. O banco de dados (`postgres`) deve estar saudável antes do `backend` iniciar.

3. Acesse:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend**: [http://localhost:3000](http://localhost:3000) (API)

Os serviços estão conectados pela rede interna do Docker:
- O backend acessa o banco via host `postgres`.
- O frontend está configurado para apontar para `http://backend:3000`.

### Persistência de Dados

Os dados do Postgres são persistidos no volume `postgres_data` (gerenciado pelo Docker). Isso garante que as tarefas criadas não sejam perdidas ao reiniciar os containers.
Adicionalmente, as pastas `./backend` e `./frontend` estão mapeadas como volumes para permitir *Hot Reload* durante o desenvolvimento.

## Executando sem Docker (Manual)

Se preferir rodar manualmente, precisará de duas janelas de terminal e um banco Postgres rodando localmente.

1. **Backend**:
   ```bash
   cd backend
   npm install
   # Ajuste o .env para usar localhost no banco de dados se necessário
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   # Ajuste o .env para VITE_API_URL=http://localhost:3000
   npm run dev
   ```

3. Acesse [http://localhost:5173](http://localhost:5173).
