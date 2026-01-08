import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/tasks", async (_req, res) => {
  const tasks = await prisma.task.findMany({ orderBy: { id: "asc" } });
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title, done } = req.body as { title?: string; done?: boolean };

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: "Título é obrigatório." });
  }

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      done: done ?? false,
    },
  });

  return res.status(201).json(task);
});

app.put("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  const { title, done } = req.body as { title?: string; done?: boolean };

  if (title !== undefined && title.trim().length === 0) {
    return res.status(400).json({ error: "Título não pode ser vazio." });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: {
        title: title?.trim(),
        done,
      },
    });

    return res.json(task);
  } catch (error) {
    return res.status(404).json({ error: "Task não encontrada." });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    await prisma.task.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: "Task não encontrada." });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
