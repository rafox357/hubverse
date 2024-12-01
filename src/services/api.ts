import { Task, Project, TimeEntry, Goal } from '../types/project';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  return handleResponse(response);
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  return handleResponse(response);
};

// Tasks
export const getTasks = async (projectId: string): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`);
  return handleResponse(response);
};

export const createTask = async (projectId: string, task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};

export const updateTask = async (projectId: string, taskId: string, updates: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

// Time Entries
export const getTimeEntries = async (userId: string): Promise<TimeEntry[]> => {
  const response = await fetch(`${API_BASE_URL}/time-entries?userId=${userId}`);
  return handleResponse(response);
};

export const createTimeEntry = async (entry: Omit<TimeEntry, 'id'>): Promise<TimeEntry> => {
  const response = await fetch(`${API_BASE_URL}/time-entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return handleResponse(response);
};

// Goals
export const getGoals = async (): Promise<Goal[]> => {
  const response = await fetch(`${API_BASE_URL}/goals`);
  return handleResponse(response);
};

export const createGoal = async (goal: Omit<Goal, 'id'>): Promise<Goal> => {
  const response = await fetch(`${API_BASE_URL}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  return handleResponse(response);
};

export const updateGoal = async (goalId: string, updates: Partial<Goal>): Promise<Goal> => {
  const response = await fetch(`${API_BASE_URL}/goals/${goalId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

interface UserSettings {
  displayName: string;
  email: string;
  theme: string;
  notifications: boolean;
  language: string;
}

const MOCK_DATA = {
  settings: {
    displayName: 'John Doe',
    email: 'john@example.com',
    theme: 'light',
    notifications: true,
    language: 'en',
  } as UserSettings,
};

const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

const api = {
  async getSettings(): Promise<UserSettings> {
    await delay(500);
    return MOCK_DATA.settings;
  },

  async updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    await delay(500);
    MOCK_DATA.settings = { ...MOCK_DATA.settings, ...settings };
    return MOCK_DATA.settings;
  }
};

export { api };
