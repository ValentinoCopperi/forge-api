"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDto = void 0;
const zod_1 = require("zod");
exports.updateUserDto = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    avatarUrl: zod_1.z.string().url().optional()
});
//# sourceMappingURL=user.dto.js.map