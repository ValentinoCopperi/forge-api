"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelect = void 0;
const client_1 = require("@prisma/client");
exports.userSelect = client_1.Prisma.validator()({
    id: true,
    name: true,
    email: true,
    avatarUrl: true,
    userRoles: {
        select: {
            role: true
        }
    }
});
//# sourceMappingURL=user.types.js.map