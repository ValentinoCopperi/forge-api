"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWithRoleSelect = void 0;
const client_1 = require("@prisma/client");
exports.userWithRoleSelect = client_1.Prisma.validator()({
    id: true,
    name: true,
    email: true,
    avatarUrl: true,
    userRoles: {
        select: { role: true }
    }
});
//# sourceMappingURL=auth.types.js.map