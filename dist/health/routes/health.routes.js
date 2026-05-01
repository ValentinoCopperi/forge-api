"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRoutes = void 0;
const express_1 = require("express");
class HealthRoutes {
    constructor(prisma_c, redis_c) {
        this.router = (0, express_1.Router)();
        this.prisma = prisma_c;
        this.redis = redis_c;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", async (req, res, next) => {
            const results = await Promise.allSettled([
                this.prisma.$queryRaw `SELECT 1`,
                this.redis.ping(),
            ]);
            const [db, redis] = results;
            const databaseOk = db.status === "fulfilled";
            const redisOk = redis.status === "fulfilled";
            const hasErrors = !databaseOk || !redisOk;
            return res.status(hasErrors ? 500 : 200).json({
                status: hasErrors ? `error` : `ok`,
                server: "ok",
                database: databaseOk ? "ok" : "error",
                redis: redisOk ? "ok" : "error",
                timestamp: new Date().toISOString(),
            });
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.HealthRoutes = HealthRoutes;
//# sourceMappingURL=health.routes.js.map