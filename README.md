# Rastreador de Préstamos

Una aplicación web moderna para rastrear y gestionar préstamos, construida con Next.js, React y Prisma.

## Características

- 🔐 Sistema de autenticación seguro
- 💰 Seguimiento y gestión de préstamos
- 📊 Panel de control con estadísticas de préstamos
- 🌙 Soporte para modo oscuro/claro
- 📱 Diseño responsivo
- 📈 Actualizaciones en tiempo real

## Tecnologías

- **Framework:** Next.js 15
- **Lenguaje:** TypeScript
- **Base de datos:** SQL con Prisma ORM - Docker
- **Estilos:** Tailwind CSS
- **Gestión de estado:** React Query
- **Manejo de formularios:** React Hook Form + Zod
- **Componentes UI:** Radix UI
- **Autenticación:** JWT + bcrypt

## Comenzando

### Prerrequisitos

- Node.js 20+
- pnpm (recomendado) o npm

### Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/FabiSantos/Loan-Tracker

```

2. Instala las dependencias:

```bash

pnpm install

```

3. Configura la base de datos:

Con docker:

```bash

 docker run --name loan-db \
  -e POSTGRES_USER=loan_user \
  -e POSTGRES_PASSWORD=loansecreta \
  -e POSTGRES_DB=loan_tracker_db \
  -p 5432:5432 \
  -d postgres

archivo .env:

DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/tu_basededatos"

pnpm prisma db push

```

4. Inicia el servidor de desarrollo:

```bash

pnpm dev

```

La aplicación estará disponible en `http://localhost:3000`

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo con Turbopack
- `pnpm build` - Construye para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta ESLint

```
## Estructura del Proyecto


loan-tracker/
├── src/              # Archivos fuente
├── prisma/          # Esquema y migraciones de la base de datos
├── public/          # Archivos estáticos
└── components/      # Componentes React

```
