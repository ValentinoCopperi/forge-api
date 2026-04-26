"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
require("multer");
const client_s3_1 = require("@aws-sdk/client-s3");
const storage_connection_1 = require("./storage.connection");
class StorageService {
    constructor() {
        this.s3 = (0, storage_connection_1.createS3Client)();
        this.bucket = process.env.S3_BUCKET;
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
            return `${process.env.S3_ENDPOINT}/${this.bucket}/${key}`;
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
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map