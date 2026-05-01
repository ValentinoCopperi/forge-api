import { PrismaClient } from "@prisma/client";
import { UserWithRole, userWithRoleSelect } from "../types/auth.types";

interface I_AuthRepository {
  findById(id: number): Promise<UserWithRole | null>;
  updateAvatar(id: number, avatarUrl: string): Promise<UserWithRole>;
  findByEmail(email: string): Promise<UserWithRole | null>;
  findByEmailWithPassword(
    email: string,
  ): Promise<(UserWithRole & { passwordHash: string }) | null>;
  createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
  }): Promise<UserWithRole>;
  saveRefreshToken(data: {
    user_id: number;
    refresh_token: string;
    expires_at: Date;
  }): Promise<string>;
}

export class AuthRepository implements I_AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async saveRefreshToken(data: {
    user_id: number;
    refresh_token: string;
    expires_at: Date;
  }): Promise<string> {
    const { user_id, refresh_token, expires_at } = data;

    const { token } = await this.prisma.session.create({
      data: {
        token: refresh_token,
        userId: user_id,
        expiresAt: expires_at,
      },
      select: {
        token: true,
      },
    });

    return token;
  }

  findById(id: number): Promise<UserWithRole | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: userWithRoleSelect,
    });
  }

  updateAvatar(id: number, avatarUrl: string): Promise<UserWithRole> {
    return this.prisma.user.update({
      where: { id },
      data: { avatarUrl },
      select: userWithRoleSelect,
    });
  }

  findByEmail(email: string): Promise<UserWithRole | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: userWithRoleSelect,
    });
  }

  findByEmailWithPassword(
    email: string,
  ): Promise<(UserWithRole & { passwordHash: string }) | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { ...userWithRoleSelect, passwordHash: true },
    });
  }

  createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
  }): Promise<UserWithRole> {
    return this.prisma.user.create({
      data: {
        ...data,
        userRoles: {
          create: {
            role: "EMPLEADO",
          },
        },
      },

      select: userWithRoleSelect,
    });
  }
}
