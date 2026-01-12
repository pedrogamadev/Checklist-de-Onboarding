# Atividade 3: Integração com Docker Compose

Este documento detalha a implementação e execução da Atividade 3, que integra Backend, Frontend e Banco de Dados (Postgres) utilizando Docker Compose.

## 📋 Checklist de Conformidade (Requisitos)

- [x] **Docker Compose**: Orquestração de 3 serviços (frontend, backend, postgres).
- [x] **Banco de Dados**: Postgres rodando na porta 5432 (externa 5433), com volume persistente.
- [x] **Backend**: API Node.js/Express rodando na porta 3000, conectando ao Postgres.
- [x] **Frontend**: React/Vite rodando na porta 5173, consumindo a API via Proxy.
- [x] **Conectividade**: Frontend acessa Backend via `/api` (Proxy reverso no Docker).
- [x] **Resiliência**: Backend aguarda o banco estar saudável (healthcheck).
- [x] **Prisma**: Configurado com `binaryTargets` para Linux (Alpine) e migrações automáticas.

## 📂 Estrutura do Projeto

- `backend/`: API (Node.js + Express + Prisma).
- `frontend/`: UI (React + Vite).
- `docker-compose.yml`: Arquivo de orquestração.
- `docs/`: Documentação.

## 🛠️ Configuração e Execução

### 1. Pré-requisitos

- Docker Desktop instalado e rodando.
- Git (para clonar/baixar o projeto).
- *Opcional*: Node.js (apenas se for rodar fora do Docker).

### 2. Rodando com Docker Compose (Recomendado)

O projeto está configurado para funcionar "out-of-the-box" com Docker.

1. **Abra o terminal na raiz do projeto**.
2. **Suba os containers**:
   ```bash
   docker compose up --build
   ```
3. **Aguarde a inicialização**:
   - O `postgres` iniciará primeiro.
   - O `backend` aguardará o `postgres` estar saudável (status "healthy") para iniciar e rodar as migrações.
   - O `frontend` iniciará por último.

### 3. Validando a Aplicação

#### Frontend (.env e Proxy)
O frontend está configurado via `docker-compose.yml` para usar `VITE_API_URL=/api`. O Vite fará o proxy das requisições para `http://backend:3000`.

- **Acesse no navegador**: [http://localhost:5173](http://localhost:5173)
- **Teste o Proxy (JSON)**: Acesse [http://localhost:5173/api/tasks](http://localhost:5173/api/tasks).
  - Você deve ver uma resposta JSON (array vazio `[]` ou lista de tarefas), **não** um erro HTML ou "Unexpected token <".

#### Backend (API)
O backend expõe a porta 3000 no host.

- **Acesse**: [http://localhost:3000/tasks](http://localhost:3000/tasks)
- **Teste com CURL**:
  ```bash
  # Criar tarefa
  curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\": \"Teste Docker\", \"done\": false}"

  # Listar tarefas
  curl http://localhost:3000/tasks
  ```

#### Banco de Dados (Postgres)
O banco expõe a porta **5433** para o host (para não conflitar com um Postgres local na 5432).

- **Via Docker Exec**:
  ```bash
  docker exec -it atividade3-postgres psql -U task_user -d task_db -c 'SELECT * FROM "Task";'
  ```

## ⚙️ Variáveis de Ambiente

O arquivo `docker-compose.yml` já injeta as variáveis necessárias para o ambiente Docker.

- **Backend**:
  - `DATABASE_URL`: Conecta ao host `postgres` interno.
  - `PORT`: 3000.
- **Frontend**:
  - `VITE_API_URL`: Definido como `/api`. Isso instrui o código do frontend a fazer chamadas relativas, que são interceptadas pelo Proxy do Vite e encaminhadas ao backend.

> **Importante**: Não use `http://backend:3000` no navegador. O navegador roda na sua máquina (Host) e não conhece o DNS interno do Docker. O Proxy resolve isso.

## 🐛 Troubleshooting

### 1. Erro "Unexpected token < in JSON at position 0" no Frontend
- **Causa**: O frontend tentou acessar a API, mas recebeu HTML (provavelmente a página index.html do próprio Vite) em vez de JSON.
- **Solução**: Verifique se a variável `VITE_API_URL` está correta. No Docker, deve ser `/api`. Se estiver rodando local sem Docker, deve ser `http://localhost:3000`. Certifique-se de que o backend está rodando e acessível.

### 2. Erro "Prisma Client could not locate the Query Engine for runtime 'linux-musl'"
- **Causa**: O `schema.prisma` não inclui o alvo binário para o Alpine Linux usado no Docker.
- **Solução**: Verifique se o `schema.prisma` contém: `binaryTargets = ["native", "linux-musl"]`. (Já corrigido neste projeto).

### 3. "ERR_NAME_NOT_RESOLVED" ao acessar `http://backend:3000` no browser
- **Causa**: Você tentou acessar o endereço interno do container pelo navegador.
- **Solução**: Use `http://localhost:3000` (porta mapeada) ou via proxy `http://localhost:5173/api/...`.

### 4. Erros de Banco de Dados ou Migrations
- **Verifique os logs**: `docker compose logs backend`
- **Healthcheck**: Confirme se o postgres está saudável com `docker compose ps`.
