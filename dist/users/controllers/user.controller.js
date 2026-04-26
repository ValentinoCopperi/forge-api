"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const AppError_1 = require("../../shared/errors/AppError");
const user_dto_1 = require("../dtos/user.dto");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll(req, res) {
        try {
            const data = await this.userService.findAll();
            return res.status(200).json({ data });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async findById(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id))
                return res.status(400).json({ error: 'Invalid id' });
            const data = await this.userService.findById(id);
            return res.status(200).json({ data });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id))
                return res.status(400).json({ error: 'Invalid id' });
            const body = user_dto_1.updateUserDto.safeParse(req.body);
            if (!body.success) {
                return res.status(400).json({ errors: body.error.flatten().fieldErrors });
            }
            const data = await this.userService.update(id, body.data);
            return res.status(200).json({ data });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map