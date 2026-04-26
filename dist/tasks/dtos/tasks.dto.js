"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskDto = void 0;
const zod_1 = require("zod");
exports.createTaskDto = zod_1.z.object({
    title: zod_1.z.string().min(3)
});
//# sourceMappingURL=tasks.dto.js.map