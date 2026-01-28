import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async getAllTasks() {
        return this.taskRepository.findAll();
    }

    async getTaskById(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("ID inválido.");
        }
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new Error("Task não encontrada.");
        }
        return task;
    }

    async createTask(title: string, done: boolean = false) {
        if (!title || title.trim().length === 0) {
            throw new Error("Título é obrigatório.");
        }
        return this.taskRepository.create(title.trim(), done);
    }

    async updateTask(id: number, title?: string, done?: boolean) {
        if (Number.isNaN(id)) {
            throw new Error("ID inválido.");
        }

        if (title !== undefined && title.trim().length === 0) {
            throw new Error("Título não pode ser vazio.");
        }

        try {
            return await this.taskRepository.update(id, title?.trim(), done);
        } catch (error) {
            throw new Error("Task não encontrada.");
        }
    }

    async deleteTask(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("ID inválido.");
        }
        try {
            await this.taskRepository.delete(id);
        } catch (error) {
            throw new Error("Task não encontrada.");
        }
    }
}
