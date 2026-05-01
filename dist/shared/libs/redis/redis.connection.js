"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = exports.initRedis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const env_config_1 = require("../../configs/env.config");
let redis;
const initRedis = () => {
    const port = Number(env_config_1.envs.REDIS_PORT);
    const host = env_config_1.envs.REDIS_HOST;
    if (!redis) {
        redis = new ioredis_1.default({
            port,
            host,
            maxRetriesPerRequest: 0,
            enableOfflineQueue: false,
        });
        redis.on("connect", () => console.log(`✅ Redis initialized successfully`));
        redis.on("error", (err) => console.log(`❌ Error initialazing error : ${err.message}`));
    }
};
exports.initRedis = initRedis;
const getRedisClient = () => {
    if (!redis) {
        throw new Error("❌ Redis is not initialized yet");
    }
    return redis;
};
exports.getRedisClient = getRedisClient;
//# sourceMappingURL=redis.connection.js.map