import React, { useState } from 'react';
import {
  FiTarget,
  FiTrendingUp,
  FiCheck,
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiTrash2
} from 'react-icons/fi';
import { Goal, KeyResult } from '../types/project';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedView, setSelectedView] = useState<'list' | 'board'>('list');

  const calculateOverallProgress = (goal: Goal): number => {
    if (!goal.keyResults.length) return 0;
    const totalProgress = goal.keyResults.reduce(
      (sum, kr) => sum + kr.progress,
      0
    );
    return Math.round(totalProgress / goal.keyResults.length);
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 70) return 'bg-green-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderGoalCard = (goal: Goal) => {
    const progress = calculateOverallProgress(goal);

    return (
      <div key={goal.id} className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
          </div>
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiMoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getProgressColor(progress)}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Key Results */}
        <div className="space-y-3">
          {goal.keyResults.map((kr) => (
            <div key={kr.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {kr.title}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">
                    {kr.current} / {kr.target} {kr.unit}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    kr.progress >= 70
                      ? 'bg-green-100 text-green-800'
                      : kr.progress >= 40
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {kr.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex -space-x-2">
            {goal.collaborators.map((collaborator) => (
              <div
                key={collaborator}
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
              >
                {collaborator[0].toUpperCase()}
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-red-500 hover:bg-red-50 rounded">
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Goals & OKRs</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track and manage organizational objectives
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiPlus className="w-5 h-5 mr-2" />
            New Goal
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center text-green-600 mb-2">
              <FiCheck className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Completed</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">4</p>
            <p className="text-sm text-gray-500">Goals achieved</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center text-blue-600 mb-2">
              <FiTarget className="w-5 h-5 mr-2" />
              <h3 className="font-medium">In Progress</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">7</p>
            <p className="text-sm text-gray-500">Active goals</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center text-purple-600 mb-2">
              <FiTrendingUp className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Success Rate</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">76%</p>
            <p className="text-sm text-gray-500">Goal completion rate</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingSpinner size="large" />
          </div>
        ) : goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(renderGoalCard)}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <FiTarget className="w-16 h-16 mb-4" />
            <p className="text-lg">No goals created yet</p>
            <p className="text-sm mt-2">Create your first goal to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
