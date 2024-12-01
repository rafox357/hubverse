import { create } from 'zustand';
import { Task, Project, TimeEntry, Goal } from '../types/project';

interface AppState {
  // User
  currentUser: any | null;
  setCurrentUser: (user: any) => void;

  // Projects
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;

  // Tasks
  tasks: Record<string, Task[]>;
  setTasks: (projectId: string, tasks: Task[]) => void;
  addTask: (projectId: string, task: Task) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Task>) => void;

  // Time Entries
  timeEntries: TimeEntry[];
  setTimeEntries: (entries: TimeEntry[]) => void;
  addTimeEntry: (entry: TimeEntry) => void;

  // Goals
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
}

export const useStore = create<AppState>((set) => ({
  // User
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  // Projects
  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, ...updates } : p
      ),
    })),

  // Tasks
  tasks: {},
  setTasks: (projectId, tasks) =>
    set((state) => ({ tasks: { ...state.tasks, [projectId]: tasks } })),
  addTask: (projectId, task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [projectId]: [...(state.tasks[projectId] || []), task],
      },
    })),
  updateTask: (projectId, taskId, updates) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [projectId]: state.tasks[projectId].map((t) =>
          t.id === taskId ? { ...t, ...updates } : t
        ),
      },
    })),

  // Time Entries
  timeEntries: [],
  setTimeEntries: (entries) => set({ timeEntries: entries }),
  addTimeEntry: (entry) =>
    set((state) => ({ timeEntries: [...state.timeEntries, entry] })),

  // Goals
  goals: [],
  setGoals: (goals) => set({ goals }),
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  updateGoal: (goalId, updates) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === goalId ? { ...g, ...updates } : g)),
    })),
}));
