# Atividade 2 - Frontend (React + Vite)

Este guia explica como rodar o frontend separado do backend existente e quais rotas são consumidas.

## Pré-requisitos

- Node.js 18+
- Backend da Atividade 1 já rodando na raiz do repositório

## Passo a passo para rodar

### 1) Backend (raiz do repositório)

```bash
npm install
npm run dev
```

O backend sobe em `http://localhost:3000`.

### 2) Frontend (pasta `/frontend`)

```bash
cd frontend
npm install
npm run dev
```

O frontend sobe por padrão em `http://localhost:5173`.

## Variáveis de ambiente

O frontend lê a URL da API via Vite:

```
VITE_API_URL=http://localhost:3000
```

Há um arquivo `.env` e um `.env.example` em `/frontend` com o mesmo formato.

## Rotas consumidas

- `GET /tasks` → lista todas as tasks
- `POST /tasks` → cria uma task
  - payload exemplo:
    ```json
    {
      "title": "Configurar e-mail corporativo"
    }
    ```
- `DELETE /tasks/:id` → remove uma task pelo ID

## Funcionalidades implementadas

- Listagem de tasks com status (concluída/pendente)
- Estado de carregamento e estado vazio
- Criação de task com validação de título
- Exclusão de task com botão dedicado
- Navegação entre `/` (listagem) e `/new` (formulário)
