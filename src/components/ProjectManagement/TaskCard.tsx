import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types/project';
import { FiClock, FiPaperclip, FiMessageSquare, FiCheckSquare } from 'react-icons/fi';

interface TaskCardProps {
  task: Task;
  columnId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, columnId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
      columnId
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-sm p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Task Title */}
      <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>

      {/* Task Description Preview */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Task Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-3">
          {/* Due Date */}
          {task.dueDate && (
            <div className="flex items-center">
              <FiClock className="w-4 h-4 mr-1" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}

          {/* Attachments Count */}
          {task.attachments.length > 0 && (
            <div className="flex items-center">
              <FiPaperclip className="w-4 h-4 mr-1" />
              <span>{task.attachments.length}</span>
            </div>
          )}

          {/* Comments Count */}
          {task.comments.length > 0 && (
            <div className="flex items-center">
              <FiMessageSquare className="w-4 h-4 mr-1" />
              <span>{task.comments.length}</span>
            </div>
          )}

          {/* Subtasks Progress */}
          {task.subtasks.length > 0 && (
            <div className="flex items-center">
              <FiCheckSquare className="w-4 h-4 mr-1" />
              <span>
                {task.subtasks.filter(st => st.status === 'done').length}/
                {task.subtasks.length}
              </span>
            </div>
          )}
        </div>

        {/* Priority Badge */}
        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {/* Assignees */}
      {task.assignees.length > 0 && (
        <div className="flex -space-x-2 mt-3">
          {task.assignees.map((assignee, index) => (
            <div
              key={assignee}
              className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
              style={{ zIndex: task.assignees.length - index }}
            >
              {assignee[0].toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
