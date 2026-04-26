"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const tasks_dto_1 = require("../dtos/tasks.dto");
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async findAll(req, res) {
        try {
            const data = await this.taskService.findAll();
            return res.status(200).json({ data });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async create(req, res) {
        try {
            const body = tasks_dto_1.createTaskDto.safeParse(req.body);
            if (!body.success) {
                return res.status(400).json({
                    errors: body.error.flatten().fieldErrors
                });
            }
            const new_task = await this.taskService.create({
                title: body.data.title,
                userId: req.user?.sub ?? 1
            });
            return res.status(200).json({ data: new_task });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=tasks.controller.js.map