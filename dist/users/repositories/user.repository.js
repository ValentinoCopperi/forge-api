"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_types_1 = require("../types/user.types");
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.user.findMany({
            select: { ...user_types_1.userSelect }
        });
    }
    findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: { ...user_types_1.userSelect }
        });
    }
    update(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
            select: { ...user_types_1.userSelect }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map