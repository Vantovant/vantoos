// API client utilities for VantoOS frontend

const API_BASE = '/api';

// ==================== Type Definitions ====================

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string | null;
  status: 'todo' | 'inProgress' | 'done';
  autoScheduled: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  dueDate?: string;
  status?: 'todo' | 'inProgress' | 'done';
  autoScheduled?: boolean;
}

export type UpdateTaskInput = Partial<CreateTaskInput>;

export interface Reminder {
  id: string;
  title: string;
  done: boolean;
  remindAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateReminderInput {
  title: string;
  done?: boolean;
  remindAt?: string;
}

export type UpdateReminderInput = Partial<CreateReminderInput>;

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
}

export type UpdateNoteInput = Partial<CreateNoteInput>;

export interface Agenda {
  id: string;
  date: string;
  summary?: string | null;
  priorities: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateAgendaInput {
  date: string;
  summary?: string;
  priorities?: string[];
}

export type UpdateAgendaInput = Partial<CreateAgendaInput>;

// ==================== API Error Class ====================

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ==================== Generic API Call Function ====================

/**
 * Generic API call handler with proper error handling
 */
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new ApiError(
      errorData.message || errorData.error || `API error: ${response.status}`,
      response.status,
      errorData
    );
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// ==================== API Client Factory ====================

interface ApiClient<T, CreateInput, UpdateInput> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (data: CreateInput) => Promise<T>;
  update: (id: string, data: UpdateInput) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

function createApiClient<T, CreateInput, UpdateInput>(
  resource: string
): ApiClient<T, CreateInput, UpdateInput> {
  return {
    getAll: () => apiCall<T[]>(`/${resource}`),
    getById: (id: string) => apiCall<T>(`/${resource}/${id}`),
    create: (data: CreateInput) =>
      apiCall<T>(`/${resource}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: UpdateInput) =>
      apiCall<T>(`/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      apiCall<void>(`/${resource}/${id}`, {
        method: 'DELETE',
      }),
  };
}

// ==================== API Clients ====================

/**
 * Tasks API client
 * @example
 * const tasks = await tasksApi.getAll();
 * const task = await tasksApi.create({ title: 'New task' });
 */
export const tasksApi = createApiClient<Task, CreateTaskInput, UpdateTaskInput>('tasks');

/**
 * Reminders API client
 * @example
 * const reminders = await remindersApi.getAll();
 * const reminder = await remindersApi.create({ title: 'Call mom' });
 */
export const remindersApi = createApiClient<Reminder, CreateReminderInput, UpdateReminderInput>('reminders');

/**
 * Notes API client
 * @example
 * const notes = await notesApi.getAll();
 * const note = await notesApi.create({ title: 'Ideas', content: '...' });
 */
export const notesApi = createApiClient<Note, CreateNoteInput, UpdateNoteInput>('notes');

/**
 * Agendas API client
 * @example
 * const agendas = await agendasApi.getAll();
 * const agenda = await agendasApi.create({ date: '2026-02-27' });
 */
export const agendasApi = createApiClient<Agenda, CreateAgendaInput, UpdateAgendaInput>('agendas');

