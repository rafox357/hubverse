import { create } from 'zustand';
import { Note, Folder } from '../types';

interface Store {
  notes: Record<string, Note>;
  folders: Record<string, Folder>;
  activeNoteId: string | null;
  addNote: (note: Note) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  notes: {},
  folders: {},
  activeNoteId: null,
  addNote: (note) =>
    set((state) => ({
      notes: { ...state.notes, [note.id]: note },
    })),
  updateNote: (id, note) =>
    set((state) => ({
      notes: {
        ...state.notes,
        [id]: { ...state.notes[id], ...note, updatedAt: new Date() },
      },
    })),
  deleteNote: (id) =>
    set((state) => {
      const newNotes = { ...state.notes };
      delete newNotes[id];
      return { notes: newNotes };
    }),
  setActiveNote: (id) => set({ activeNoteId: id }),
}));