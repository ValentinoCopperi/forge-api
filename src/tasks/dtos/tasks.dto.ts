


import { z } from 'zod';



export const createTaskDto = z.object({
    title : z.string().min(3)
})