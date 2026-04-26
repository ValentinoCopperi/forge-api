"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskWithUserSelect = void 0;
const client_1 = require("@prisma/client");
exports.taskWithUserSelect = client_1.Prisma.validator()({
    id: true,
    title: true,
    user: {
        select: {
            id: true,
            name: true,
            email: true
        }
    }
});
//# sourceMappingURL=tasks.types.js.map