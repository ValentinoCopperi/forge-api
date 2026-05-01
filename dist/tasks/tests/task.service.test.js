"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const task_service_1 = require("../services/task.service");
const AppError_1 = require("../../shared/errors/AppError");
const mockRepository = {
    findAll: vitest_1.vi.fn(),
    create: vitest_1.vi.fn(),
    findByTitle: vitest_1.vi.fn(),
};
const mockRedis = {
    get: vitest_1.vi.fn(),
    set: vitest_1.vi.fn(),
    del: vitest_1.vi.fn(),
};
const service = new task_service_1.TaskService(mockRepository, mockRedis);
(0, vitest_1.beforeEach)(() => {
    vitest_1.vi.clearAllMocks();
});
(0, vitest_1.describe)("TaskService - findAll", () => {
    (0, vitest_1.it)("should return a cached tasks array", async () => {
        mockRedis.get.mockResolvedValue('[{"title":"Mi task","userId":1}]');
        const result = await service.findAll();
        (0, vitest_1.expect)(mockRepository.findAll).not.toHaveBeenCalled();
        (0, vitest_1.expect)(result).toEqual([{ title: "Mi task", userId: 1 }]);
    });
    (0, vitest_1.it)("should return a non-cached tasks array from db", async () => {
        mockRedis.get.mockResolvedValue(null);
        const fakeTasks = [{ title: "Mi task", userId: 1 }];
        mockRepository.findAll.mockResolvedValue(fakeTasks);
        const result = await service.findAll();
        (0, vitest_1.expect)(mockRepository.findAll).toHaveBeenCalled();
        (0, vitest_1.expect)(mockRedis.set).toHaveBeenCalledExactlyOnceWith("tasks", JSON.stringify(fakeTasks));
        (0, vitest_1.expect)(result).toEqual(fakeTasks);
    });
});
(0, vitest_1.describe)("TaskService - create", () => {
    (0, vitest_1.it)("should create a task successfully", async () => {
        mockRepository.findByTitle.mockResolvedValue(null);
        mockRepository.create.mockResolvedValue({
            id: 1,
            title: "Mi task",
            userId: 1,
        });
        const result = await service.create({ title: "Mi task", userId: 1 });
        (0, vitest_1.expect)(result.title).toBe("Mi task");
        (0, vitest_1.expect)(mockRepository.create).toHaveBeenCalledOnce();
    });
    (0, vitest_1.it)("case: userId is undefined , it should throw a 400 AppError", async () => {
        await (0, vitest_1.expect)(service.create({ title: "Mi task", userId: undefined })).rejects.toThrow(AppError_1.AppError);
    });
    (0, vitest_1.it)("case: title is already used, it should throw a 404 AppError", async () => {
        mockRepository.findByTitle.mockResolvedValue({
            id: 1,
            title: "Mi task",
            userId: 1,
        });
        await (0, vitest_1.expect)(service.create({ title: "Mi task", userId: 1 })).rejects.toThrow(AppError_1.AppError);
    });
    (0, vitest_1.it)("case: title or userId is null ,  it should throw a 400 AppError", async () => {
        await (0, vitest_1.expect)(service.create({ title: "", userId: 1 })).rejects.toThrow(AppError_1.AppError);
    });
});
//# sourceMappingURL=task.service.test.js.map