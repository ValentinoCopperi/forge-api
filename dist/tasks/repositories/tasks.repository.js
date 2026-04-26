"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const tasks_types_1 = require("../types/tasks.types");
class TaskRepository {
    constructor(prisma) {
        this.prisma = prisma;
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
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=tasks.repository.js.map