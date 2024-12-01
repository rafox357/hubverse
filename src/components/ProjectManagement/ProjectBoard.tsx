import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../../types/project';
import TaskCard from './TaskCard';
import { FiPlus } from 'react-icons/fi';

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const ProjectBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [],
      color: 'bg-gray-100'
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      tasks: [],
      color: 'bg-blue-50'
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [],
      color: 'bg-yellow-50'
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [],
      color: 'bg-green-50'
    }
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.data.current?.columnId;

    if (activeColumnId !== overColumnId) {
      setColumns(columns => {
        const activeColumn = columns.find(col => col.id === activeColumnId);
        const overColumn = columns.find(col => col.id === overColumnId);

        if (!activeColumn || !overColumn) return columns;

        const activeTask = activeColumn.tasks.find(task => task.id === active.id);
        if (!activeTask) return columns;

        return columns.map(column => {
          if (column.id === activeColumnId) {
            return {
              ...column,
              tasks: column.tasks.filter(task => task.id !== active.id)
            };
          }
          if (column.id === overColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, { ...activeTask, status: overColumnId }]
            };
          }
          return column;
        });
      });
    }
  };

  const addNewTask = (columnId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: 'New Task',
      description: '',
      status: columnId as Task['status'],
      priority: 'medium',
      assignees: [],
      dueDate: null,
      startDate: null,
      estimatedTime: null,
      actualTime: null,
      tags: [],
      parentId: null,
      subtasks: [],
      attachments: [],
      comments: [],
      customFields: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setColumns(columns => 
      columns.map(column => 
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  return (
    <div className="h-full">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="flex gap-4 h-full p-4">
          {columns.map(column => (
            <div
              key={column.id}
              className={`flex flex-col w-80 rounded-lg ${column.color} p-4`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">{column.title}</h3>
                <span className="text-sm text-gray-500">{column.tasks.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto">
                <SortableContext items={column.tasks} strategy={verticalListSortingStrategy}>
                  {column.tasks.map(task => (
                    <TaskCard key={task.id} task={task} columnId={column.id} />
                  ))}
                </SortableContext>
              </div>

              <button
                onClick={() => addNewTask(column.id)}
                className="mt-2 w-full py-2 flex items-center justify-center text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add Task
              </button>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default ProjectBoard;
