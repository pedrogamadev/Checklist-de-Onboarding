import { prisma } from "../lib/prisma";

export class TaskRepository {
    async findAll() {
        return prisma.task.findMany({ orderBy: { id: "asc" } });
    }

    async findById(id: number) {
        return prisma.task.findUnique({ where: { id } });
    }

    async create(title: string, done: boolean) {
        return prisma.task.create({
            data: { title, done },
        });
    }

    async update(id: number, title: string | undefined, done: boolean | undefined) {
        return prisma.task.update({
            where: { id },
            data: { title, done },
        });
    }

    async delete(id: number) {
        return prisma.task.delete({ where: { id } });
    }
}
