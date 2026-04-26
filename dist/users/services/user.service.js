"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findAll() {
        return this.userRepository.findAll();
    }
    async findById(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new AppError_1.AppError('User not found', 404);
        return user;
    }
    update(id, data) {
        return this.userRepository.update(id, data);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map