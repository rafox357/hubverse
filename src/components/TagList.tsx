import React from 'react';
import { useStore } from '../store/useStore';
import { Tag } from 'lucide-react';

export const TagList: React.FC = () => {
  const notes = useStore((state) => state.notes);
  
  const tags = React.useMemo(() => {
    const tagSet = new Set<string>();
    Object.values(notes).forEach(note => {
      note.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [notes]);

  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center mb-2">
        <Tag className="w-4 h-4 mr-2" />
        <h2 className="text-sm font-medium">Tags</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-800 rounded-full text-xs cursor-pointer hover:bg-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};