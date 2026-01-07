# Atividade 1 – Backend básico com Node + Prisma + Postgres

## Objetivo
Montar uma API simples com CRUD de tasks utilizando Node + Express, Prisma ORM e PostgreSQL em container Docker.

## Passo a passo para rodar

### 1) Subir o Postgres com Docker
```bash
docker-compose up -d
```

### 2) Instalar dependências
```bash
npm install
```

### 3) Rodar migrations
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4) Iniciar o backend
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

## Testes no Insomnia/Postman
- Foram realizados testes manuais no Insomnia/Postman para todas as rotas (GET, POST, PUT, DELETE).
- Os testes confirmaram criação, atualização, listagem e exclusão de tasks.
- A validação de título vazio retornou erro 400 conforme esperado.

## Observações
- As migrations do Prisma estão configuradas e funcionam via `npm run prisma:migrate`.
- O banco Postgres persiste dados no volume `postgres_data` do Docker.
- É possível usar clientes SQL como HeidiSQL ou DBeaver para visualizar a base.
