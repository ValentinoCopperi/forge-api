# Documentación del Proyecto

## 1. Información General

**Nombre**: Task API REST
**Tecnología Principal**: Node.js + TypeScript + Express
**Puerto**: 3001

## 2. Arquitectura

El proyecto sigue una **arquitectura modular** basada en el patrón **MVC** con separación en:
- **Controllers**: Manejan la lógica de HTTP
- **Services**: Lógica de negocio
- **Repositories**: Acceso a datos (Prisma)

Estructura de módulos:
```
src/
├── auth/           # Módulo de autenticación
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middlewares/
│   ├── dtos/
│   ├── types/
│   └── module.ts
├── tasks/          # Módulo de tareas
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── dtos/
│   ├── types/
│   └── module.ts
├── notifications/  # Módulo de notificaciones
├── shared/          # Componentes compartidos
│   ├── errors/
│   ├── middleware/
│   └── libs/
│       ├── prisma/
│       ├── redis/
│       ├── sockets/
│       └── storage/
└── index.ts        # Entry point
```

## 3. Base de Datos

**PostgreSQL** con **Prisma ORM**.

**Modelos**:
- **User**: id, name, email, passwordHash, avatarUrl, relations con Task y UserRole
- **Task**: id, title, userId (relación con User)
- **UserRole**: userId, role (enum: DIRECTOR, GERENTE, EMPLEADO)

## 4. Autenticación

- **JWT** con access token (15 min) y refresh token (7 días)
- ** bcrypt** para hashing de contraseñas
- **Middlewares**:
  - `tokenMiddleware`: Valida JWT
  - `roleMiddleware`: Control de acceso por roles
  - `rateLimitMiddleware`: Limita requests por IP (usa Redis)
  - `uploadMiddleware`: Multer para subir archivos

## 5. Servicios Externos

| Servicio | Propósito | Configuración |
|----------|-----------|----------------|
| **Redis** | Cache + Rate limiting | Puerto 6379 |
| **PostgreSQL** | Base de datos | Puerto 5432 |
| **MinIO** | Almacenamiento S3 compatible | Puertos 9000/9001 |
| **Socket.io** | WebSockets en tiempo real | CORS abierto |

## 6. Endpoints

### Auth (`/api/auth`)
- `POST /api/auth/create` - Registro de usuarios
- `POST /api/auth/signin` - Login (con rate limiting)
- `POST /api/auth/uploadAvatar` - Subir avatar (requiere token)

### Tasks (`/api/tasks`)
- `GET /api/tasks` - Listar todas las tareas
- `POST /api/tasks` - Crear tarea (requiere token)

### Otros
- `GET /health` - Health check
- `GET /client` - Cliente HTML
- `/api/notifications` - Rutas de notificaciones

## 7. DTOs y Validación

Se usa **Zod** para validación de esquemas:
- `registerSchema`: name, email, password
- `loginSchema`: email, password
- `createTaskDto`: title

## 8. Manejo de Errores

Clase `AppError` con statusCode para errores personalizados. Middleware `ErrorRequestHandler` captura y responde errores.

## 9. Docker

**docker-compose.dev.yml** levanta:
- PostgreSQL 15
- pgAdmin 4
- MinIO (S3)
- Redis 7

## 10. Scripts

```json
"dev": "nodemon --exec ts-node src/index.ts"
"build": "tsc"
"start": "node dist/index.js"
"prisma-seed": "ts-node prisma/seed.ts"
```

## 11. Dependencias Principales

- express, socket.io, @prisma/client, ioredis, jsonwebtoken, bcrypt, multer, zod, @aws-sdk/client-s3
