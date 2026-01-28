import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    async index(_req: Request, res: Response) {
        const tasks = await this.taskService.getAllTasks();
        return res.json(tasks);
    }

    async show(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const task = await this.taskService.getTaskById(id);
            return res.json(task);
        } catch (error) {
            return res.status((error as Error).message === "ID inválido." ? 400 : 404).json({ error: (error as Error).message });
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { title, done } = req.body;
            const task = await this.taskService.createTask(title, done);
            return res.status(201).json(task);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { title, done } = req.body;
            const task = await this.taskService.updateTask(id, title, done);
            return res.json(task);
        } catch (error) {
            const message = (error as Error).message;
            if (message === "ID inválido." || message === "Título não pode ser vazio.") {
                return res.status(400).json({ error: message });
            }
            return res.status(404).json({ error: message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.taskService.deleteTask(id);
            return res.status(204).send();
        } catch (error) {
            const message = (error as Error).message;
            if (message === "ID inválido.") {
                return res.status(400).json({ error: message });
            }
            return res.status(404).json({ error: message });
        }
    }
}
