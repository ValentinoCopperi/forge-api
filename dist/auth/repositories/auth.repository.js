"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const auth_types_1 = require("../types/auth.types");
class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            select: auth_types_1.userWithRoleSelect
        });
    }
    findByEmailWithPassword(email) {
        return this.prisma.user.findUnique({
            where: { email },
            select: { ...auth_types_1.userWithRoleSelect, passwordHash: true }
        });
    }
    createUser(data) {
        return this.prisma.user.create({
            data: {
                ...data,
                userRoles: {
                    create: {
                        role: "EMPLEADO"
                    }
                }
            },
            select: auth_types_1.userWithRoleSelect
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map