import React from 'react';
import { useStore } from '../store/useStore';
import { formatDate } from '../utils/dateUtils';

export const NoteList: React.FC = () => {
  const notes = useStore((state) => state.notes);
  const setActiveNote = useStore((state) => state.setActiveNote);

  return (
    <div className="space-y-2">
      {Object.values(notes).map((note) => (
        <button
          key={note.id}
          onClick={() => setActiveNote(note.id)}
          className="w-full text-left p-3 rounded hover:bg-gray-800 transition-colors"
        >
          <h3 className="font-medium truncate">{note.title}</h3>
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <span>{formatDate(note.updatedAt)}</span>
            {note.tags.length > 0 && (
              <div className="flex gap-1 ml-2">
                {note.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 bg-gray-700 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};