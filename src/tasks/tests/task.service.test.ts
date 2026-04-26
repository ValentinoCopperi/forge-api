import { describe, it, expect, vi, beforeEach } from "vitest"
import { TaskService } from "../services/task.service"
import { AppError } from "../../shared/errors/AppError"

const mockRepository = {
    findAll: vi.fn(),
    create: vi.fn(),
    findByTitle: vi.fn(),
}

const mockRedis = {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
}

const service = new TaskService(mockRepository as any, mockRedis as any)

beforeEach(() => {
    vi.clearAllMocks()
})

describe('TaskService - create', () => {

    it('should create a task successfully', async () => {
        mockRepository.findByTitle.mockResolvedValue(null)
        mockRepository.create.mockResolvedValue({ id: 1, title: 'Mi task', userId: 1 })

        const result = await service.create({ title: 'Mi task', userId: 1 })

        expect(result.title).toBe('Mi task')
        expect(mockRepository.create).toHaveBeenCalledOnce()
    })

    it('case: userId is undefined , it should throw a 400 AppError', async () => {

        await expect(service.create({ title: 'Mi task', userId: undefined as any })).rejects.toThrow(AppError)


    })


    it('case: title is already used, it should throw a 404 AppError', async () => {

        mockRepository.findByTitle.mockResolvedValue({ id: 1, title: 'Mi task', userId: 1 })

        await expect(service.create({ title: 'Mi task', userId: 1 })).rejects.toThrow(AppError)
    })

    it('case: title or userId is null ,  it should throw a 400 AppError', async () => {

        await expect(service.create({ title: '', userId: 1 })).rejects.toThrow(AppError)

    })

})
