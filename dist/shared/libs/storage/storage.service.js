"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
require("multer");
const client_s3_1 = require("@aws-sdk/client-s3");
const storage_connection_1 = require("./storage.connection");
const env_config_1 = require("../../configs/env.config");
class StorageService {
    constructor() {
        this.s3 = (0, storage_connection_1.createS3Client)();
        this.bucket = env_config_1.envs.S3_BUCKET;
        this.s3Endpoint = env_config_1.envs.S3_ENDPOINT;
    }
    async uploadFile(file, key) {
        try {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            });
            await this.s3.send(command);
            return `${this.s3Endpoint}/${this.bucket}/${key}`;
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Error uploading file');
        }
    }
    async deleteFile(key) {
        try {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key
            });
            await this.s3.send(command);
        }
        catch (error) {
            console.error('Error deleting file:', error);
            throw new Error('Error deleting file');
        }
    }
    createKey(fileName, id) {
        const ext = fileName.split('.').pop();
        return `avatars/user-${String(id)}/${ext}`;
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map