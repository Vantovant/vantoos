# VantoOS Backend Documentation

This document describes the lightweight backend architecture for VantoOS, built with **Prisma 7** and **SQLite** as a development-ready solution with a clear migration path to Laravel.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Service Layer](#service-layer)
- [Running Migrations](#running-migrations)
- [Seeding Data](#seeding-data)
- [Frontend Integration](#frontend-integration)
- [Future Laravel Migration](#future-laravel-migration)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────┐  │
│  │  React Hooks  │──│ API Client    │──│ Components           │  │
│  │  (useData.ts) │  │ (api.ts)      │  │ (Dashboard, Tasks)   │  │
│  └──────────────┘  └───────────────┘  └──────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP (fetch)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Routes (Next.js App Router)               │
│  /api/tasks    /api/reminders    /api/notes    /api/agendas     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Service Layer                             │
│  taskService   reminderService   noteService   agendaService    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Prisma ORM (v7)                              │
│                     @prisma/client                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SQLite Database                               │
│                    prisma/dev.db                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **Prisma 7 with SQLite**: Zero-configuration database for development
2. **Service Layer Pattern**: Business logic separated from API routes
3. **Typed API Client**: Full TypeScript support from database to UI
4. **Test User Hardcoded**: Authentication placeholder for rapid development

---

## Database Schema

The database schema is defined in `prisma/schema.prisma`:

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  tasks     Task[]
  reminders Reminder[]
  notes     Note[]
  agendas   Agenda[]
}
```

### Task Model

```prisma
model Task {
  id            String   @id @default(cuid())
  title         String
  description   String?
  priority      String   @default("medium")  // "high", "medium", "low"
  dueDate       DateTime?
  status        String   @default("todo")    // "todo", "inProgress", "done"
  autoScheduled Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  userId String
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Reminder Model

```prisma
model Reminder {
  id        String   @id @default(cuid())
  title     String
  done      Boolean  @default(false)
  remindAt  DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId String
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Note Model

```prisma
model Note {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId String
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Agenda Model

```prisma
model Agenda {
  id         String   @id @default(cuid())
  date       DateTime
  summary    String?
  priorities String?  // JSON serialized array
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  userId String
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, date])
}
```

---

## API Endpoints

All API routes follow RESTful conventions and are located in `src/app/api/`.

### Tasks API

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| GET    | `/api/tasks`      | List all tasks      |
| GET    | `/api/tasks/:id`  | Get task by ID      |
| POST   | `/api/tasks`      | Create new task     |
| PUT    | `/api/tasks/:id`  | Update task         |
| DELETE | `/api/tasks/:id`  | Delete task         |

**Create Task Request Body:**
```json
{
  "title": "Task title",
  "description": "Optional description",
  "priority": "high" | "medium" | "low",
  "dueDate": "2026-02-28T10:00:00Z",
  "status": "todo" | "inProgress" | "done",
  "autoScheduled": false
}
```

### Reminders API

| Method | Endpoint              | Description            |
|--------|----------------------|------------------------|
| GET    | `/api/reminders`      | List all reminders     |
| GET    | `/api/reminders/:id`  | Get reminder by ID     |
| POST   | `/api/reminders`      | Create new reminder    |
| PUT    | `/api/reminders/:id`  | Update reminder        |
| DELETE | `/api/reminders/:id`  | Delete reminder        |

**Create Reminder Request Body:**
```json
{
  "title": "Reminder title",
  "done": false,
  "remindAt": "2026-02-28T15:00:00Z"
}
```

### Notes API

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| GET    | `/api/notes`      | List all notes      |
| GET    | `/api/notes/:id`  | Get note by ID      |
| POST   | `/api/notes`      | Create new note     |
| PUT    | `/api/notes/:id`  | Update note         |
| DELETE | `/api/notes/:id`  | Delete note         |

**Create Note Request Body:**
```json
{
  "title": "Note title",
  "content": "Note content in markdown"
}
```

### Agendas API

| Method | Endpoint           | Description          |
|--------|-------------------|----------------------|
| GET    | `/api/agendas`     | List all agendas     |
| GET    | `/api/agendas/:id` | Get agenda by ID     |
| POST   | `/api/agendas`     | Create new agenda    |
| PUT    | `/api/agendas/:id` | Update agenda        |
| DELETE | `/api/agendas/:id` | Delete agenda        |

**Create Agenda Request Body:**
```json
{
  "date": "2026-02-27",
  "summary": "Daily summary",
  "priorities": ["Priority 1", "Priority 2", "Priority 3"]
}
```

---

## Service Layer

Services encapsulate business logic and database operations. Located in `src/services/`.

### taskService.ts

```typescript
import { taskService } from '@/services/taskService';

// Get all tasks for a user
const tasks = await taskService.getAll(userId);

// Get single task
const task = await taskService.getById(taskId, userId);

// Create task
const newTask = await taskService.create({
  title: 'New task',
  priority: 'high',
  dueDate: new Date()
}, userId);

// Update task
const updated = await taskService.update(taskId, {
  status: 'done'
}, userId);

// Delete task
await taskService.delete(taskId, userId);
```

### reminderService.ts

Similar API to taskService with `title`, `done`, and `remindAt` fields.

### noteService.ts

Similar API to taskService with `title` and `content` fields.

### agendaService.ts

Includes helper methods for serializing/deserializing the `priorities` JSON array.

---

## Running Migrations

### Initial Setup

```bash
# Install dependencies
bun install

# Generate Prisma client
bunx prisma generate

# Create database and run migrations
bunx prisma migrate dev --name init
```

### Creating New Migrations

```bash
# After modifying schema.prisma
bunx prisma migrate dev --name your_migration_name
```

### Reset Database

```bash
# Reset and re-seed
bunx prisma migrate reset
```

### View Database

```bash
# Open Prisma Studio (GUI)
bunx prisma studio
```

---

## Seeding Data

The seed script is located at `prisma/seed.ts`.

### Run Seed

```bash
bunx prisma db seed
```

### Seed Data Contents

The seed creates:
- 1 test user (`test-user-123`, email: `vanto@vantoos.com`)
- 5 sample tasks with various priorities and statuses
- 3 sample reminders
- 2 sample notes
- 1 agenda for today

### Customizing Seed

Edit `prisma/seed.ts` to add or modify seed data:

```typescript
await prisma.task.create({
  data: {
    title: 'Your new task',
    priority: 'high',
    userId: user.id,
  },
});
```

---

## Frontend Integration

### API Client (`src/lib/api.ts`)

Provides typed API clients for all resources:

```typescript
import { tasksApi, remindersApi, notesApi, agendasApi } from '@/lib/api';

// Fetch all tasks
const tasks = await tasksApi.getAll();

// Create a task
const newTask = await tasksApi.create({
  title: 'New task',
  priority: 'high'
});

// Update a task
await tasksApi.update(taskId, { status: 'done' });

// Delete a task
await tasksApi.delete(taskId);
```

### React Hooks (`src/hooks/useData.ts`)

Custom hooks for data fetching with state management:

```typescript
import { useTasks, useReminders, useNotes, useAgendas } from '@/hooks/useData';

function MyComponent() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const { reminders, toggleReminder } = useReminders();
  const { notes, createNote } = useNotes();
  const { agendas, todayAgenda } = useAgendas();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return <TaskList tasks={tasks} />;
}
```

### Hook Features

- **Auto-fetching**: Data is fetched on component mount
- **CRUD operations**: Built-in create, update, delete methods
- **Derived state**: `tasksByStatus`, `todayAgenda`, `activeReminders`
- **Error handling**: Errors are captured and exposed
- **Optimistic updates**: State is updated immediately after mutations

---

## Future Laravel Migration

This backend is designed as a prototype with a clear path to Laravel.

### Migration Checklist

1. **Database Schema**
   - Copy Prisma schema to Laravel migrations
   - Use Laravel's migration syntax
   - Add proper indexes and foreign keys

2. **Models**
   - Create Eloquent models for User, Task, Reminder, Note, Agenda
   - Define relationships (`hasMany`, `belongsTo`)
   - Add casts for JSON fields (priorities)

3. **Controllers**
   - Convert service layer methods to Laravel controllers
   - Use Laravel's resource controllers
   - Implement Form Requests for validation

4. **API Routes**
   - Define routes in `routes/api.php`
   - Use API Resources for response formatting
   - Add middleware for authentication

5. **Authentication**
   - Replace hardcoded test user with Laravel Sanctum
   - Implement proper user registration/login
   - Add API tokens or session authentication

### Laravel Equivalents

| Current (Prisma/Next.js) | Laravel Equivalent |
|--------------------------|-------------------|
| `prisma/schema.prisma`   | `database/migrations/` |
| `src/services/*.ts`      | `app/Services/*.php` or Controllers |
| `src/app/api/*/route.ts` | `routes/api.php` + Controllers |
| `@prisma/client`         | Eloquent ORM |
| Test user ID             | Auth::user()->id |

### Example Laravel Controller

```php
<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = auth()->user()->tasks()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($tasks);
    }

    public function store(TaskRequest $request): JsonResponse
    {
        $task = auth()->user()->tasks()->create($request->validated());
        return response()->json($task, 201);
    }

    public function update(TaskRequest $request, Task $task): JsonResponse
    {
        $this->authorize('update', $task);
        $task->update($request->validated());
        return response()->json($task);
    }

    public function destroy(Task $task): JsonResponse
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response()->noContent();
    }
}
```

---

## Environment Variables

```env
# Database URL (SQLite for development)
DATABASE_URL="file:./prisma/dev.db"
```

For production with other databases:

```env
# PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/vantoos"

# MySQL
DATABASE_URL="mysql://user:password@localhost:3306/vantoos"
```

---

## Troubleshooting

### Prisma Client Not Generated

```bash
bunx prisma generate
```

### Database Out of Sync

```bash
bunx prisma db push
# or
bunx prisma migrate dev
```

### Reset Everything

```bash
rm -rf prisma/dev.db prisma/migrations
bunx prisma migrate dev --name init
bunx prisma db seed
```

### View Logs

The Prisma client logs queries in development mode. Check the terminal running `bun dev` for SQL queries.

---

## Related Files

- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Seed data script
- `src/lib/prisma.ts` - Prisma client singleton
- `src/lib/api.ts` - API client utilities
- `src/hooks/useData.ts` - React data hooks
- `src/services/` - Service layer
- `src/app/api/` - API route handlers
