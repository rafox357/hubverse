export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignees: string[];
  dueDate: Date | null;
  startDate: Date | null;
  estimatedTime: number | null;
  actualTime: number | null;
  tags: string[];
  parentId: string | null;
  subtasks: Task[];
  attachments: Attachment[];
  comments: Comment[];
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'completed';
  owner: string;
  members: string[];
  tasks: Task[];
  views: View[];
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface View {
  id: string;
  type: 'list' | 'board' | 'calendar' | 'timeline' | 'table' | 'mindmap' | 'box';
  name: string;
  config: Record<string, any>;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: Date;
  createdBy: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  mentions: string[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: Date;
  endTime: Date | null;
  duration: number | null;
  description: string;
  billable: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  dueDate: Date;
  keyResults: KeyResult[];
  owner: string;
  collaborators: string[];
}

export interface KeyResult {
  id: string;
  title: string;
  type: 'number' | 'percentage' | 'currency' | 'boolean';
  target: number;
  current: number;
  unit: string;
  progress: number;
}

export interface Sprint {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'completed';
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  goals: string[];
  metrics: {
    totalPoints: number;
    completedPoints: number;
    velocity: number;
  };
}
