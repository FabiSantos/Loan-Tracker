# Rastreador de Préstamos

Visita la página web en:

[https://loan-tracker-nine.vercel.app/](https://loan-tracker-nine.vercel.app/)

Una aplicación web moderna para rastrear y gestionar préstamos, construida con Next.js, React y Prisma.

## Características

- 🔐 Sistema de autenticación seguro
- 💰 Seguimiento y gestión de préstamos
- 📊 Panel de control con estadísticas de préstamos
- 🌙 Soporte para modo oscuro/claro
- 📱 Diseño responsivo
- 🔍 Búsqueda avanzada y filtrado
- 📈 Actualizaciones en tiempo real

## Tecnologías

- **Framework:** Next.js 15
- **Lenguaje:** TypeScript
- **Base de datos:** SQL con Prisma ORM
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

pnpm create next-app loan-tracker --ts --tailwind --app
cd loan-tracker

pnpm dlx shadcn-ui@latest init

pnpm add lucide-react class-variance-authority tailwind-merge @tanstack/react-query better-sqlite3 prisma @prisma/client

```

3. Configura la base de datos:

```bash
npx prisma init --datasource-provider sqlite

pnpm prisma db push
```

````archivo .env:

DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/tu_basededatos"


4. Inicia el servidor de desarrollo:

```bash
pnpm dev
````

La aplicación estará disponible en `http://localhost:3000`

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo con Turbopack
- `pnpm build` - Construye para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta ESLint

## Estructura del Proyecto

```
loan-tracker/
├── src/              # Archivos fuente
├── prisma/          # Esquema y migraciones de la base de datos
├── public/          # Archivos estáticos
└── components/      # Componentes React
```
