import { Prisma } from "@prisma/client";



export const taskWithUserSelect = Prisma.validator<Prisma.TaskSelect>()({
    id: true,
    title: true,
    user: {
        select: {
            id: true,
            name: true,
            email: true
        }
    }
})


export type TaskWithUser = Prisma.TaskGetPayload<{
    select: typeof taskWithUserSelect
}>