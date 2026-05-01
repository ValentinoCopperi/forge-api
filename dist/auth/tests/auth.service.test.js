"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const auth_service_1 = require("../services/auth.service");
const auth_repository_1 = require("../repositories/auth.repository");
const prisma_test_connection_1 = require("../../shared/libs/prisma/prisma-test.connection");
const testRepository = new auth_repository_1.AuthRepository(prisma_test_connection_1.prisma_test);
const storageService = {};
const service = new auth_service_1.AuthService(testRepository, storageService);
(0, vitest_1.beforeEach)(async () => {
    await prisma_test_connection_1.prisma_test.userRole.deleteMany();
    await prisma_test_connection_1.prisma_test.user.deleteMany();
});
(0, vitest_1.describe)("Auth Sevice - Register new user", () => {
    (0, vitest_1.it)("it should create and return a new user", async () => {
        const data = {
            name: "Valen",
            email: "valen@test.com",
            password: "123456",
        };
        const result = await service.register(data);
        (0, vitest_1.expect)(result).toEqual(vitest_1.expect.objectContaining({
            name: "Valen",
            email: "valen@test.com",
        }));
    });
    (0, vitest_1.it)("case:email already used , it throw a 409", async () => {
        const data = {
            name: "Valen",
            email: "valen@test.com",
            password: "123456",
        };
        const result = await service.register(data);
        (0, vitest_1.expect)(result).toEqual(vitest_1.expect.objectContaining({
            name: "Valen",
            email: "valen@test.com",
        }));
        await (0, vitest_1.expect)(service.register(data)).rejects.toMatchObject({
            message: "valen@test.com is already used",
            statusCode: 409,
        });
    });
});
//# sourceMappingURL=auth.service.test.js.map