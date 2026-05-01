"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class TaskService {
    constructor(taskRepository, redisClient) {
        this.taskRepository = taskRepository;
        this.redisClient = redisClient;
    }
    /*
        Offset-based pagination:
        Usa page (página) y limit (items por página).
        
        Ejemplo:
        page=1, limit=5 → trae items 0–4
        page=2, limit=5 → trae items 5–9
        
        
        ✅Ventajas: Permite saltar directamente a cualquier página (ej: page=50).
        ❌Desventajas:
            * Problemas de consistencia: si se insertan o eliminan registros mientras navegas,
                los resultados pueden moverse → duplicados o faltantes.
            * Performance: en bases de datos grandes, OFFSET alto es costoso porque el motor
                debe recorrer muchos registros antes de devolver resultados.
   */
    async findAllOffsetPaginated(data) {
        const { page, limit } = data;
        const [results, totalCount] = await Promise.all([
            this.taskRepository.findAllOffsetPaginated({ page, limit }),
            this.taskRepository.count()
        ]);
        return {
            data: results,
            pagination: {
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalItems: totalCount
            }
        };
    }
    /*
        Cursor-based pagination: En vez de usar páginas (1,2,3...), usa el ID del último elemento devuelto como "cursor".
        Ejemplo: (Twitter) limit=5 -> trae 5 tareas. El nextCursor devuelto es el ID de la última tarea.
        Para la siguiente llamada, pasas ese nextCursor y te trae las siguientes 5 tareas desde ese punto.

        ✅ Ventaja: Rápido sin importar el volumen — siempre usa índice
        ❌ Desventaja: No podés saltar a una página específica
    */
    async findAllCursorPaginated(data) {
        const results = await this.taskRepository.findAllCursorPaginated(data);
        const nextCursor = results.length > 0
            ? results[results.length - 1].id
            : null;
        return { data: results, nextCursor };
    }
    async findAll() {
        const redisResult = await this.redisClient.get('tasks');
        if (!redisResult) {
            const tasks = await this.taskRepository.findAll();
            await this.redisClient.set("tasks", JSON.stringify(tasks));
            return tasks;
        }
        return JSON.parse(redisResult);
    }
    async create(data) {
        const { title, userId } = data;
        if (isNaN(userId))
            throw new AppError_1.AppError("UserId must be a number", 400);
        if (!title || !userId)
            throw new AppError_1.AppError("Title and userId are required", 400);
        if (await this.taskRepository.findByTitle(title))
            throw new AppError_1.AppError(`Title : ${title} , cannot be used`, 404);
        const new_task = await this.taskRepository.create(data);
        await this.redisClient.del('tasks');
        return new_task;
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map