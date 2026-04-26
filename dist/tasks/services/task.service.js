"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    findAll() {
        return this.taskRepository.findAll();
    }
    create(data) {
        const { title, userId } = data;
        if (isNaN(userId))
            throw new AppError_1.AppError("UserId must be a number", 400);
        if (!title || !userId)
            throw new AppError_1.AppError("Title and userId are required", 400);
        return this.taskRepository.create(data);
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map