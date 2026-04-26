import { Prisma } from "@prisma/client";
export declare const taskWithUserSelect: {
    id: true;
    title: true;
    user: {
        select: {
            id: true;
            name: true;
            email: true;
        };
    };
};
export type TaskWithUser = Prisma.TaskGetPayload<{
    select: typeof taskWithUserSelect;
}>;
