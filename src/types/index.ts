export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  references: string[];
  aiSummary?: string;
  aiTags?: string[];
  collaborators?: string[];
  version?: number;
  parentId?: string;
}

export interface Folder {
  id: string;
  name: string;
  notes: string[];
  subfolders: string[];
  permissions?: Permission[];
}

export interface Permission {
  userId: string;
  role: 'reader' | 'writer' | 'admin';
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'note' | 'tag' | 'folder';
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'reference' | 'contains' | 'tagged';
}