import 'multer'
import {
    PutObjectCommand,
    DeleteObjectCommand
} from '@aws-sdk/client-s3'

import { createS3Client } from './storage.connection'
import { envs } from '../../configs/env.config'

interface I_StorageService {
    uploadFile(file: Express.Multer.File, key: string): Promise<string>
    deleteFile(key: string): Promise<void>
}

export class StorageService implements I_StorageService {

    private readonly s3 = createS3Client()
    private readonly bucket = envs.S3_BUCKET;
    private readonly s3Endpoint = envs.S3_ENDPOINT;

    async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            })

            await this.s3.send(command)

            return `${this.s3Endpoint}/${this.bucket}/${key}`

        } catch (error) {
            console.error('Error uploading file:', error)
            throw new Error('Error uploading file')
        }
    }

    async deleteFile(key: string): Promise<void> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key
            })

            await this.s3.send(command)

        } catch (error) {
            console.error('Error deleting file:', error)
            throw new Error('Error deleting file')
        }
    }


    public createKey(fileName: string, id: number): string {
        const ext = fileName.split('.').pop()
        return `avatars/user-${String(id)}/${ext}`
    }
}
