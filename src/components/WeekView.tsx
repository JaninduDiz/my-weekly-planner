'use client';

import { format, addDays, isSameDay, isToday } from 'date-fns';

interface WeekViewProps {
  currentWeek: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onWeekChange: (date: Date) => void;
}

export default function WeekView({ currentWeek, selectedDate, onDateSelect, onWeekChange }: WeekViewProps) {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const goToPreviousWeek = () => {
    const prevWeek = addDays(currentWeek, -7);
    onWeekChange(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = addDays(currentWeek, 7);
    onWeekChange(nextWeek);
  };

  const goToCurrentWeek = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1);
    onWeekChange(weekStart);
    onDateSelect(today);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Week Navigation */}
      <div className="flex items-center justify-between px-4 py-2">
        <button
          onClick={goToPreviousWeek}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToCurrentWeek}
          className="text-sm text-blue-500 font-medium hover:text-blue-600"
        >
          This Week
        </button>
        
        <button
          onClick={goToNextWeek}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week Days */}
      <div className="flex px-2 pb-2">
        {weekDays.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => onDateSelect(day)}
            className={`flex-1 min-w-0 py-2 px-1 text-center rounded-lg transition-colors relative ${
              isSameDay(day, selectedDate)
                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                : isToday(day)
                ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-400'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="text-xs font-medium mb-1">
              {format(day, 'EEE')}
            </div>
            <div className={`text-lg font-semibold ${
              isSameDay(day, selectedDate) ? 'text-blue-700' : 'text-gray-900'
            }`}>
              {format(day, 'd')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
