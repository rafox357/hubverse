import React, { useState } from 'react';
import { Command } from 'cmdk';
import { Search } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-2 flex items-center">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <Command.Input
            placeholder="Search notes, commands..."
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <Command.List className="max-h-96 overflow-y-auto p-2">
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Quick Actions">
            <Command.Item>Create new note</Command.Item>
            <Command.Item>Open settings</Command.Item>
            <Command.Item>Toggle dark mode</Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};