"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const auth_types_1 = require("../types/auth.types");
class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveRefreshToken(data) {
        const { user_id, refresh_token, expires_at } = data;
        const { token } = await this.prisma.session.create({
            data: {
                token: refresh_token,
                userId: user_id,
                expiresAt: expires_at,
            },
            select: {
                token: true,
            },
        });
        return token;
    }
    findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: auth_types_1.userWithRoleSelect,
        });
    }
    updateAvatar(id, avatarUrl) {
        return this.prisma.user.update({
            where: { id },
            data: { avatarUrl },
            select: auth_types_1.userWithRoleSelect,
        });
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            select: auth_types_1.userWithRoleSelect,
        });
    }
    findByEmailWithPassword(email) {
        return this.prisma.user.findUnique({
            where: { email },
            select: { ...auth_types_1.userWithRoleSelect, passwordHash: true },
        });
    }
    createUser(data) {
        return this.prisma.user.create({
            data: {
                ...data,
                userRoles: {
                    create: {
                        role: "EMPLEADO",
                    },
                },
            },
            select: auth_types_1.userWithRoleSelect,
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map