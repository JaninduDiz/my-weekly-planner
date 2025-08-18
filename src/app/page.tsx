'use client';

import { useState, useEffect, useCallback } from 'react';
import { format, startOfWeek, addDays, isToday, isSameDay } from 'date-fns';
import TaskList from '@/components/TaskList';
import AddTaskModal from '@/components/AddTaskModal';
import WeekView from '@/components/WeekView';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  important: boolean;
  category: string;
  date: Date;
}

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'calendar' | 'week'>('calendar');
  const [weekTasks, setWeekTasks] = useState<Task[]>([]);
  const [weekLoading, setWeekLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(`/api/tasks?date=${selectedDate.toISOString()}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const fetchWeekTasks = useCallback(async () => {
    try {
      setWeekLoading(true);
      const start = new Date(currentWeek);
      start.setHours(0, 0, 0, 0);
      const end = addDays(currentWeek, 6);
      end.setHours(23, 59, 59, 999);
      const response = await fetch(`/api/tasks?start=${start.toISOString()}&end=${end.toISOString()}`);
      const data = await response.json();
      setWeekTasks(data);
    } catch (error) {
      console.error('Error fetching week tasks:', error);
    } finally {
      setWeekLoading(false);
    }
  }, [currentWeek]);

  useEffect(() => {
    if (activeTab === 'week') {
      fetchWeekTasks();
    }
  }, [activeTab, currentWeek, fetchWeekTasks]);

  const addTask = async (taskData: Omit<Task, '_id'>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      
      if (response.ok) {
        await fetchTasks();
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskComplete = async (taskId: string, completed: boolean) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const moveTaskToNextDay = async (taskId: string) => {
    try {
      const nextDay = addDays(selectedDate, 1);
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          date: nextDay,
          movedFrom: selectedDate 
        }),
      });
      await fetchTasks();
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            Weekly Goals
          </h1>
        </div>
      </header>
      
      {activeTab === 'calendar' ? (
        <>
          {/* Week View */}
          <WeekView
            currentWeek={currentWeek}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onWeekChange={setCurrentWeek}
          />

          {/* Tasks for Selected Date */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                {isToday(selectedDate) ? 'Today' : format(selectedDate, 'EEEE, MMM d')}
              </h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors"
              >
                + Add Task
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleComplete={toggleTaskComplete}
                onMoveToNextDay={moveTaskToNextDay}
                onDelete={deleteTask}
              />
            )}
          </div>

          {/* Add Task Modal */}
          <AddTaskModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onAdd={addTask}
            selectedDate={selectedDate}
          />
        </>
      ) : (
        /* Week tab */
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">This Week</h2>
          </div>
          {weekLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i)).map((day) => {
                const dayTasks = weekTasks.filter((t) => isSameDay(new Date(t.date), day));
                return (
                  <div key={day.toISOString()}>
                    <div className="text-sm text-gray-500 mb-2">{format(day, 'EEEE, MMM d')}</div>
                    <TaskList
                      tasks={dayTasks}
                      onToggleComplete={toggleTaskComplete}
                      onMoveToNextDay={moveTaskToNextDay}
                      onDelete={deleteTask}
                      hideMoveAction
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-20">
        <div className="flex items-center justify-around py-1">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center justify-center px-6 py-1 ${
              activeTab === 'calendar' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {/* Calendar icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[11px] leading-tight mt-0.5">Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`flex flex-col items-center justify-center px-6 py-1 ${
              activeTab === 'week' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {/* List/Week icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-[11px] leading-tight mt-0.5">Week</span>
          </button>
        </div>
        {/* Safe area inset spacer - lift icons further above the home indicator */}
        <div style={{ height: 'calc(env(safe-area-inset-bottom) + 28px)' }} />
      </nav>
    </div>
  );
}
