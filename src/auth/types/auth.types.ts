import { $Enums, Prisma } from "@prisma/client";


export const userWithRoleSelect = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    name: true,
    email: true,
    avatarUrl : true,
    userRoles: {
        select: { role: true }
    }
})

export type UserWithRole = Prisma.UserGetPayload<{
    select: typeof userWithRoleSelect
}>

export interface JwtPayload {
    sub: number
    email: string
    roles: $Enums.Role[]
}
