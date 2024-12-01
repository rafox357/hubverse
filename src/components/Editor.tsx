import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { useStore } from '../store/useStore';
import { EditorToolbar } from './EditorToolbar';
import { extractReferences } from '../utils/noteUtils';

export const Editor: React.FC = () => {
  const activeNoteId = useStore((state) => state.activeNoteId);
  const notes = useStore((state) => state.notes);
  const updateNote = useStore((state) => state.updateNote);

  const activeNote = activeNoteId ? notes[activeNoteId] : null;

  const handleContentChange = (value: string) => {
    if (!activeNoteId) return;
    const references = extractReferences(value);
    updateNote(activeNoteId, { 
      content: value,
      references,
      updatedAt: new Date()
    });
  };

  if (!activeNote) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Select or create a note to start editing</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="border-b border-gray-200 p-4">
        <input
          type="text"
          value={activeNote.title}
          onChange={(e) => updateNote(activeNote.id, { 
            title: e.target.value,
            updatedAt: new Date()
          })}
          className="text-2xl font-semibold bg-transparent focus:outline-none w-full"
          placeholder="Note title..."
        />
      </div>
      <EditorToolbar />
      <div className="flex-1 overflow-auto">
        <CodeMirror
          value={activeNote.content}
          height="100%"
          extensions={[markdown()]}
          onChange={handleContentChange}
          theme="light"
          className="h-full"
        />
      </div>
    </div>
  );
};