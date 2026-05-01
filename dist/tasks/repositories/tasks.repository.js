"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const tasks_types_1 = require("../types/tasks.types");
class TaskRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async count() {
        return await this.prisma.task.count();
    }
    findAllOffsetPaginated(data) {
        const { page, limit } = data;
        const offset = (page - 1) * limit;
        return this.prisma.task.findMany({
            skip: offset,
            take: limit,
            select: { ...tasks_types_1.taskWithUserSelect }
        });
    }
    findAllCursorPaginated(data) {
        const { cursor, limit } = data;
        return this.prisma.task.findMany({
            where: {
                id: { gt: cursor || 0 }
            },
            take: limit || 10,
            select: { ...tasks_types_1.taskWithUserSelect }
        });
    }
    findAll() {
        return this.prisma.task.findMany({
            select: { ...tasks_types_1.taskWithUserSelect }
        });
    }
    create(data) {
        const { title, userId } = data;
        return this.prisma.task.create({
            data: {
                title,
                userId
            }
        });
    }
    async findByTitle(title) {
        const task = await this.prisma.task.findFirst({
            where: {
                title: {
                    equals: title
                }
            }
        });
        return !!task;
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=tasks.repository.js.map