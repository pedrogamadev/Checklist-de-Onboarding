# Atividade 1 – Backend básico com Node + Prisma + Postgres

## Objetivo
Montar uma API simples com CRUD de tasks utilizando Node + Express, Prisma ORM e PostgreSQL em container Docker.

## Passo a passo para rodar

### 1 Instalar dependências
```bash
npm install
```

### 3 Rodar migrations
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4 Iniciar o backend
```bash
npm run dev
```

A API ficará disponível em: `http://localhost:3000`

## Rotas da API
- `GET /tasks` → listar todas as tasks
- `POST /tasks` → criar task
- `PUT /tasks/:id` → atualizar title/done
- `DELETE /tasks/:id` → excluir task

## Exemplos de requisição (JSON)

### Criar task
`POST /tasks`
```json
{
  "title": "Estudar Prisma",
  "done": false
}
```

### Atualizar task
`PUT /tasks/1`
```json
{
  "title": "Estudar Prisma ORM",
  "done": true
}
```

### Observações
- Foi criado o ambiente de banco de dados através do programa SQL SHELL (psql) com o nome de "task_db"

### Testes da API
- A API foi testada utilizando o Postman, realizando as operações de listagem (GET), criação (POST), atualização (PUT) e exclusão (DELETE) de tasks. Todas as rotas retornaram os códigos HTTP esperados e os dados foram persistidos corretamente no banco PostgreSQL através do Prisma ORM.
