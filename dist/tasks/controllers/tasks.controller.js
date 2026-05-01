"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const tasks_dto_1 = require("../dtos/tasks.dto");
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async findAllOffsetPaginated(req, res) {
        const { page = 1, limit = 20 } = req.query;
        const data = await this.taskService.findAllOffsetPaginated({ page: Number(page), limit: Number(limit) });
        return res.status(200).json({ data });
    }
    async findAllCursorPaginated(req, res) {
        const { cursor = 0, limit = 10 } = req.query;
        const data = await this.taskService.findAllCursorPaginated({ cursor: Number(cursor), limit: Number(limit) });
        return res.status(200).json({ data });
    }
    async findAll(req, res) {
        const data = await this.taskService.findAll();
        return res.status(200).json({ data });
    }
    async create(req, res) {
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
}
exports.TaskController = TaskController;
//# sourceMappingURL=tasks.controller.js.map