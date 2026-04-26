import { Prisma } from "@prisma/client";
export declare const userSelect: {
    id: true;
    name: true;
    email: true;
    avatarUrl: true;
    userRoles: {
        select: {
            role: true;
        };
    };
};
export type UserWithRoles = Prisma.UserGetPayload<{
    select: typeof userSelect;
}>;
