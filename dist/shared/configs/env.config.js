"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    APP_PORT: zod_1.z.coerce.number().default(3000),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    JWT_REFRESH_SECRET: zod_1.z.string(),
    POSTGRES_USER: zod_1.z.string(),
    POSTGRES_PASSWORD: zod_1.z.string(),
    POSTGRES_DB: zod_1.z.string(),
    POSTGRES_PORT: zod_1.z.coerce.number(),
    PG_ADMIN_PORT: zod_1.z.coerce.number(),
    PGADMIN_DEFAULT_EMAIL: zod_1.z.string().email(),
    PGADMIN_DEFAULT_PASSWORD: zod_1.z.string(),
    MINIO_PORT: zod_1.z.coerce.number(),
    MINIO_CONSOLE_PORT: zod_1.z.coerce.number(),
    MINIO_ROOT_USER: zod_1.z.string(),
    MINIO_ROOT_PASSWORD: zod_1.z.string(),
    S3_ENDPOINT: zod_1.z.string(),
    S3_ACCESS_KEY: zod_1.z.string(),
    S3_SECRET_KEY: zod_1.z.string(),
    S3_BUCKET: zod_1.z.string(),
    S3_REGION: zod_1.z.string(),
    REDIS_PORT: zod_1.z.coerce.number(),
    REDIS_HOST: zod_1.z.string(),
    MAX_IP_REQUEST: zod_1.z.coerce.number().default(5),
});
const parseEnvs = () => {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        console.error("❌ Invalid environment variables:");
        console.error(result.error.flatten().fieldErrors);
        throw new Error("Invalid environment variables");
    }
    return result.data;
};
exports.envs = parseEnvs();
//# sourceMappingURL=env.config.js.map