import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { GraphNode, GraphLink } from '../types';

export const useGraphData = () => {
  const notes = useStore((state) => state.notes);
  const folders = useStore((state) => state.folders);

  return useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const processedTags = new Set<string>();
    
    // Add notes as nodes
    Object.values(notes).forEach(note => {
      nodes.push({
        id: note.id,
        label: note.title,
        type: 'note'
      });

      // Add reference links
      note.references.forEach(refId => {
        if (notes[refId]) {
          links.push({
            source: note.id,
            target: refId,
            type: 'reference'
          });
        }
      });

      // Add tag nodes and links
      note.tags.forEach(tag => {
        const tagId = `tag-${tag}`;
        if (!processedTags.has(tagId)) {
          nodes.push({
            id: tagId,
            label: tag,
            type: 'tag'
          });
          processedTags.add(tagId);
        }
        links.push({
          source: note.id,
          target: tagId,
          type: 'tagged'
        });
      });
    });

    // Add folder nodes and containment links
    Object.values(folders).forEach(folder => {
      nodes.push({
        id: folder.id,
        label: folder.name,
        type: 'folder'
      });

      folder.notes.forEach(noteId => {
        if (notes[noteId]) {
          links.push({
            source: folder.id,
            target: noteId,
            type: 'contains'
          });
        }
      });
    });

    return { nodes, links };
  }, [notes, folders]);
};