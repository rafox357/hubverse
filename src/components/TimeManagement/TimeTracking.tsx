import React, { useState, useEffect } from 'react';
import { TimeEntry, Task } from '../../types/project';
import { FiPlay, FiPause, FiStopCircle, FiClock, FiDollarSign } from 'react-icons/fi';

interface TimeTrackingProps {
  task?: Task;
}

const TimeTracking: React.FC<TimeTrackingProps> = ({ task }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [description, setDescription] = useState('');
  const [isBillable, setIsBillable] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && currentEntry) {
      interval = setInterval(() => {
        const elapsed = Date.now() - currentEntry.startTime.getTime();
        setElapsedTime(Math.floor(elapsed / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, currentEntry]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTracking = () => {
    const newEntry: TimeEntry = {
      id: `time-${Date.now()}`,
      taskId: task?.id || '',
      userId: 'current-user', // Replace with actual user ID
      startTime: new Date(),
      endTime: null,
      duration: null,
      description: description,
      billable: isBillable
    };
    setCurrentEntry(newEntry);
    setIsTracking(true);
  };

  const pauseTracking = () => {
    setIsTracking(false);
  };

  const resumeTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = () => {
    if (currentEntry) {
      const endTime = new Date();
      const duration = Math.floor(
        (endTime.getTime() - currentEntry.startTime.getTime()) / 1000
      );
      
      const completedEntry: TimeEntry = {
        ...currentEntry,
        endTime,
        duration
      };
      
      // Here you would typically save the entry to your backend
      console.log('Completed time entry:', completedEntry);
      
      setCurrentEntry(null);
      setIsTracking(false);
      setElapsedTime(0);
      setDescription('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Time Tracking</h3>
        <div className="text-2xl font-mono">{formatTime(elapsedTime)}</div>
      </div>

      <div className="space-y-4">
        {/* Description Input */}
        <div>
          <input
            type="text"
            placeholder="What are you working on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Billable Toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setIsBillable(!isBillable)}
            className={`flex items-center px-3 py-1 rounded-md ${
              isBillable
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FiDollarSign className="w-4 h-4 mr-1" />
            Billable
          </button>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-2">
          {!isTracking && !currentEntry && (
            <button
              onClick={startTracking}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FiPlay className="w-4 h-4 mr-2" />
              Start
            </button>
          )}

          {isTracking && currentEntry && (
            <>
              <button
                onClick={pauseTracking}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                <FiPause className="w-4 h-4 mr-2" />
                Pause
              </button>
              <button
                onClick={stopTracking}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <FiStopCircle className="w-4 h-4 mr-2" />
                Stop
              </button>
            </>
          )}

          {!isTracking && currentEntry && (
            <>
              <button
                onClick={resumeTracking}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FiPlay className="w-4 h-4 mr-2" />
                Resume
              </button>
              <button
                onClick={stopTracking}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <FiStopCircle className="w-4 h-4 mr-2" />
                Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;
