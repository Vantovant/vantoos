'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  tasksApi,
  remindersApi,
  notesApi,
  agendasApi,
  type Task,
  type Reminder,
  type Note,
  type Agenda,
  type CreateTaskInput,
  type UpdateTaskInput,
  type CreateReminderInput,
  type UpdateReminderInput,
  type CreateNoteInput,
  type UpdateNoteInput,
  type CreateAgendaInput,
  type UpdateAgendaInput,
} from '@/lib/api';

// ==================== Generic Data Hook State ====================

interface UseDataState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

// ==================== useTasks Hook ====================

interface UseTasksReturn extends UseDataState<Task> {
  tasks: Task[];
  tasksByStatus: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
  refetch: () => Promise<void>;
  createTask: (data: CreateTaskInput) => Promise<Task | null>;
  updateTask: (id: string, data: UpdateTaskInput) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<boolean>;
}

/**
 * Hook for fetching and managing tasks
 * @example
 * const { tasks, loading, createTask } = useTasks();
 */
export function useTasks(): UseTasksReturn {
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tasks = await tasksApi.getAll();
      setData(tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (input: CreateTaskInput): Promise<Task | null> => {
    try {
      const newTask = await tasksApi.create(input);
      setData((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      return null;
    }
  }, []);

  const updateTask = useCallback(async (id: string, input: UpdateTaskInput): Promise<Task | null> => {
    try {
      const updatedTask = await tasksApi.update(id, input);
      setData((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      return updatedTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      return null;
    }
  }, []);

  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    try {
      await tasksApi.delete(id);
      setData((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      return false;
    }
  }, []);

  // Group tasks by status
  const tasksByStatus = {
    todo: data.filter((t) => t.status === 'todo'),
    inProgress: data.filter((t) => t.status === 'inProgress'),
    done: data.filter((t) => t.status === 'done'),
  };

  return {
    data,
    tasks: data,
    tasksByStatus,
    loading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}

// ==================== useReminders Hook ====================

interface UseRemindersReturn extends UseDataState<Reminder> {
  reminders: Reminder[];
  activeReminders: Reminder[];
  completedReminders: Reminder[];
  refetch: () => Promise<void>;
  createReminder: (data: CreateReminderInput) => Promise<Reminder | null>;
  updateReminder: (id: string, data: UpdateReminderInput) => Promise<Reminder | null>;
  deleteReminder: (id: string) => Promise<boolean>;
  toggleReminder: (id: string) => Promise<Reminder | null>;
}

/**
 * Hook for fetching and managing reminders
 * @example
 * const { reminders, loading, toggleReminder } = useReminders();
 */
export function useReminders(): UseRemindersReturn {
  const [data, setData] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const reminders = await remindersApi.getAll();
      setData(reminders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reminders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const createReminder = useCallback(async (input: CreateReminderInput): Promise<Reminder | null> => {
    try {
      const newReminder = await remindersApi.create(input);
      setData((prev) => [newReminder, ...prev]);
      return newReminder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reminder');
      return null;
    }
  }, []);

  const updateReminder = useCallback(async (id: string, input: UpdateReminderInput): Promise<Reminder | null> => {
    try {
      const updatedReminder = await remindersApi.update(id, input);
      setData((prev) => prev.map((r) => (r.id === id ? updatedReminder : r)));
      return updatedReminder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update reminder');
      return null;
    }
  }, []);

  const deleteReminder = useCallback(async (id: string): Promise<boolean> => {
    try {
      await remindersApi.delete(id);
      setData((prev) => prev.filter((r) => r.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete reminder');
      return false;
    }
  }, []);

  const toggleReminder = useCallback(async (id: string): Promise<Reminder | null> => {
    const reminder = data.find((r) => r.id === id);
    if (!reminder) return null;
    return updateReminder(id, { done: !reminder.done });
  }, [data, updateReminder]);

  // Separate active and completed reminders
  const activeReminders = data.filter((r) => !r.done);
  const completedReminders = data.filter((r) => r.done);

  return {
    data,
    reminders: data,
    activeReminders,
    completedReminders,
    loading,
    error,
    refetch: fetchReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    toggleReminder,
  };
}

// ==================== useNotes Hook ====================

interface UseNotesReturn extends UseDataState<Note> {
  notes: Note[];
  refetch: () => Promise<void>;
  createNote: (data: CreateNoteInput) => Promise<Note | null>;
  updateNote: (id: string, data: UpdateNoteInput) => Promise<Note | null>;
  deleteNote: (id: string) => Promise<boolean>;
}

/**
 * Hook for fetching and managing notes
 * @example
 * const { notes, loading, createNote } = useNotes();
 */
export function useNotes(): UseNotesReturn {
  const [data, setData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const notes = await notesApi.getAll();
      setData(notes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote = useCallback(async (input: CreateNoteInput): Promise<Note | null> => {
    try {
      const newNote = await notesApi.create(input);
      setData((prev) => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
      return null;
    }
  }, []);

  const updateNote = useCallback(async (id: string, input: UpdateNoteInput): Promise<Note | null> => {
    try {
      const updatedNote = await notesApi.update(id, input);
      setData((prev) => prev.map((n) => (n.id === id ? updatedNote : n)));
      return updatedNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update note');
      return null;
    }
  }, []);

  const deleteNote = useCallback(async (id: string): Promise<boolean> => {
    try {
      await notesApi.delete(id);
      setData((prev) => prev.filter((n) => n.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
      return false;
    }
  }, []);

  return {
    data,
    notes: data,
    loading,
    error,
    refetch: fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
}

// ==================== useAgendas Hook ====================

interface UseAgendasReturn extends UseDataState<Agenda> {
  agendas: Agenda[];
  todayAgenda: Agenda | null;
  refetch: () => Promise<void>;
  createAgenda: (data: CreateAgendaInput) => Promise<Agenda | null>;
  updateAgenda: (id: string, data: UpdateAgendaInput) => Promise<Agenda | null>;
  deleteAgenda: (id: string) => Promise<boolean>;
}

/**
 * Hook for fetching and managing agendas
 * @example
 * const { agendas, todayAgenda, loading } = useAgendas();
 */
export function useAgendas(): UseAgendasReturn {
  const [data, setData] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgendas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const agendas = await agendasApi.getAll();
      setData(agendas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agendas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgendas();
  }, [fetchAgendas]);

  const createAgenda = useCallback(async (input: CreateAgendaInput): Promise<Agenda | null> => {
    try {
      const newAgenda = await agendasApi.create(input);
      setData((prev) => [newAgenda, ...prev]);
      return newAgenda;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create agenda');
      return null;
    }
  }, []);

  const updateAgenda = useCallback(async (id: string, input: UpdateAgendaInput): Promise<Agenda | null> => {
    try {
      const updatedAgenda = await agendasApi.update(id, input);
      setData((prev) => prev.map((a) => (a.id === id ? updatedAgenda : a)));
      return updatedAgenda;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update agenda');
      return null;
    }
  }, []);

  const deleteAgenda = useCallback(async (id: string): Promise<boolean> => {
    try {
      await agendasApi.delete(id);
      setData((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete agenda');
      return false;
    }
  }, []);

  // Find today's agenda
  const today = new Date().toISOString().split('T')[0];
  const todayAgenda = data.find((a) => a.date.split('T')[0] === today) || null;

  return {
    data,
    agendas: data,
    todayAgenda,
    loading,
    error,
    refetch: fetchAgendas,
    createAgenda,
    updateAgenda,
    deleteAgenda,
  };
}
