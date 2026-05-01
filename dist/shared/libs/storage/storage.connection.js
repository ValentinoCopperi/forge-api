"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createS3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_config_1 = require("../../configs/env.config");
const createS3Client = () => new client_s3_1.S3Client({
    endpoint: env_config_1.envs.S3_ENDPOINT,
    region: env_config_1.envs.S3_REGION,
    credentials: {
        accessKeyId: env_config_1.envs.S3_ACCESS_KEY,
        secretAccessKey: env_config_1.envs.S3_SECRET_KEY
    },
    forcePathStyle: true // necesario para MinIO
});
exports.createS3Client = createS3Client;
//# sourceMappingURL=storage.connection.js.map