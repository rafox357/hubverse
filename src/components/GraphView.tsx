import React, { useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useStore } from '../store/useStore';
import { GraphNode, GraphLink } from '../types';
import { useGraphData } from '../hooks/useGraphData';

export const GraphView: React.FC = () => {
  const { nodes, links } = useGraphData();
  const setActiveNote = useStore((state) => state.setActiveNote);

  const graphData = useMemo(() => ({
    nodes,
    links
  }), [nodes, links]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    if (node.type === 'note') {
      setActiveNote(node.id);
    }
  }, [setActiveNote]);

  return (
    <div className="w-full h-full bg-gray-50 border-b border-gray-200">
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="label"
        nodeColor={(node: any) => 
          node.type === 'note' ? '#3b82f6' : 
          node.type === 'tag' ? '#10b981' : '#6366f1'
        }
        linkColor={(link: any) => 
          link.type === 'reference' ? '#94a3b8' : 
          link.type === 'contains' ? '#cbd5e1' : '#e2e8f0'
        }
        onNodeClick={handleNodeClick}
        nodeRelSize={6}
        linkWidth={1}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        cooldownTicks={100}
        d3VelocityDecay={0.1}
      />
    </div>
  );
};