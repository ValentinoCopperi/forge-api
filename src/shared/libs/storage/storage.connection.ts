import { S3Client } from '@aws-sdk/client-s3'
import { envs } from '../../configs/env.config'

export const createS3Client = () => new S3Client({
    endpoint: envs.S3_ENDPOINT,
    region: envs.S3_REGION,
    credentials: {
        accessKeyId: envs.S3_ACCESS_KEY,
        secretAccessKey: envs.S3_SECRET_KEY
    },
    forcePathStyle: true  // necesario para MinIO
})