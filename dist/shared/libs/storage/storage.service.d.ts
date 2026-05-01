import 'multer';
interface I_StorageService {
    uploadFile(file: Express.Multer.File, key: string): Promise<string>;
    deleteFile(key: string): Promise<void>;
}
export declare class StorageService implements I_StorageService {
    private readonly s3;
    private readonly bucket;
    private readonly s3Endpoint;
    uploadFile(file: Express.Multer.File, key: string): Promise<string>;
    deleteFile(key: string): Promise<void>;
    createKey(fileName: string, id: number): string;
}
export {};
