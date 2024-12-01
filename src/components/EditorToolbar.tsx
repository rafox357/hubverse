import React from 'react';
import { Bold, Italic, List, Link, Image } from 'lucide-react';
import { useStore } from '../store/useStore';

export const EditorToolbar: React.FC = () => {
  const activeNoteId = useStore((state) => state.activeNoteId);
  const updateNote = useStore((state) => state.updateNote);

  const insertMarkdown = (markdown: string) => {
    if (!activeNoteId) return;
    updateNote(activeNoteId, {
      content: markdown
    });
  };

  return (
    <div className="border-b border-gray-200 p-2 flex items-center space-x-2">
      <button
        onClick={() => insertMarkdown('**bold**')}
        className="p-1.5 rounded hover:bg-gray-100"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => insertMarkdown('*italic*')}
        className="p-1.5 rounded hover:bg-gray-100"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => insertMarkdown('- list item')}
        className="p-1.5 rounded hover:bg-gray-100"
        title="List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => insertMarkdown('[link](url)')}
        className="p-1.5 rounded hover:bg-gray-100"
        title="Link"
      >
        <Link className="w-4 h-4" />
      </button>
      <button
        onClick={() => insertMarkdown('![image](url)')}
        className="p-1.5 rounded hover:bg-gray-100"
        title="Image"
      >
        <Image className="w-4 h-4" />
      </button>
    </div>
  );
};