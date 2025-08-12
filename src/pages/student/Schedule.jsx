import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Calendar, Clock, BookOpen, Users, MapPin, ChevronLeft, ChevronRight, PlusCircle, Video, Grid, GraduationCap, Clock3, CalendarCheck, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const classColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-pink-100', 'bg-yellow-100'];

const scheduleData = [
  { id: 1, course: 'Cyber Security', instructor: 'Dr. Sarah Johnson', day: 'Monday', start: '10:00', end: '11:30', room: 'Room 101', online: true },
  { id: 2, course: 'Data Structures', instructor: 'Prof. Michael Chen', day: 'Tuesday', start: '14:00', end: '15:30', room: 'Room 203', online: false },
  { id: 3, course: 'Web Development', instructor: 'Dr. Emily Brown', day: 'Wednesday', start: '13:00', end: '14:30', room: 'Room 305', online: true },
  { id: 4, course: 'Cyber Security', instructor: 'Dr. Sarah Johnson', day: 'Thursday', start: '10:00', end: '11:30', room: 'Room 101', online: false },
  { id: 5, course: 'Data Structures', instructor: 'Prof. Michael Chen', day: 'Thursday', start: '14:00', end: '15:30', room: 'Room 203', online: true },
  { id: 6, course: 'Web Development', instructor: 'Dr. Emily Brown', day: 'Friday', start: '13:00', end: '14:30', room: 'Room 305', online: false },
  { id: 7, course: 'Machine Learning', instructor: 'Dr. Alex Wong', day: 'Thursday', start: '09:00', end: '10:30', room: 'Room 405', online: true },
  { id: 8, course: 'Database Systems', instructor: 'Prof. Lisa Park', day: 'Thursday', start: '16:00', end: '17:30', room: 'Room 202', online: true }
];

function getToday() {
  const jsDay = new Date().getDay();
  // JS: 0=Sun, 1=Mon, ..., 6=Sat; our weekDays: 0=Mon, ..., 4=Fri
  return weekDays[jsDay - 1] || 'Monday';
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function Schedule() {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(getToday());
  const [viewMode, setViewMode] = useState('weekly');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = getToday();
  const todayClasses = scheduleData.filter(cls => cls.day === today);
  const filteredClasses = scheduleData.filter(cls => cls.day === selectedDay);

  const totalClasses = scheduleData.length;
  const onlineClasses = scheduleData.filter(cls => cls.online).length;
  const totalHours = scheduleData.reduce((acc, cls) => {
    const start = parseInt(cls.start.split(':')[0]);
    const end = parseInt(cls.end.split(':')[0]);
    return acc + (end - start);
  }, 0);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-4">
          {/* Header Section */}
          <div className="flex justify_between items-center mb-4 flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" /> {t('student.schedule.title')}
              </h1>
              <p className="text-gray-500 dark:text-gray-300">{t('student.schedule.subtitle')}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1">
              <button
                onClick={() => setViewMode('weekly')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                  viewMode === 'weekly' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {t('student.schedule.views.weekly')}
              </button>
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                  viewMode === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {t('student.schedule.views.monthly')}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Today's Classes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" /> {t('student.schedule.todayTitle')}
              </h2>
              <div className="flex overflow-x-auto pb-2 -mx-1 px-1">
                <div className="flex gap-3 min-w-min">
                  {todayClasses.length === 0 && <div className="text-gray-400 dark:text-gray-500">{t('student.schedule.noToday')}</div>}
                  {todayClasses.map((cls, idx) => (
                    <div key={cls.id} className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3 w-[280px] flex-shrink-0">
                      <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font_medium mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100 font-medium mb-2">
                        <BookOpen className="w-4 h-4 text-blue-600" /> {cls.course}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Users className="w-3.5 h-3.5" /> {cls.instructor}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Clock className="w-3.5 h-3.5" /> {cls.start} - {cls.end}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-3.5 h-3.5" /> {cls.room}
                        </div>
                        {cls.online && (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                            <Video className="w-3.5 h-3.5" /> {t('student.schedule.onlineAvailable')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{t('student.schedule.stats.title')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('student.schedule.stats.totalClasses')}</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">{totalClasses}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">{t('student.schedule.stats.thisSemester')}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Video className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('student.schedule.stats.onlineClasses')}</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{onlineClasses}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">{t('student.schedule.stats.availableOnline')}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-3">
                    <div className="flex items_center gap-2 text-purple-600 dark:text-purple-400 flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <Clock3 className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('student.schedule.stats.totalHours')}</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-1">{totalHours}</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">{t('student.schedule.stats.weeklyHours')}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <CalendarCheck className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('student.schedule.stats.attendance')}</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-300 mt-1">92%</p>
                    <p className="text-xs text-orange-600 dark:text-orange-400">{t('student.schedule.stats.currentRate')}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{t('student.schedule.actions.title')}</h3>
                <div className="grid grid-cols-2 gap-3 h-[calc(100%-3rem)]">
                  <button className="flex flex-col items-center justify-center gap-3 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 transition-colors">
                    <Video className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text_gray-700 dark:text-gray-300 text-center text-gray-700">{t('student.schedule.actions.joinNext')}</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-3 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 transition-colors">
                    <Bell className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{t('student.schedule.actions.setReminder')}</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-3 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 transition-colors">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{t('student.schedule.actions.syncCalendar')}</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-3 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 transition-colors">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{t('student.schedule.actions.viewMap')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Day Selection */}
            <div className="flex gap-2">
              {weekDays.map((day, idx) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedDay === day ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* Schedule Content */}
            {viewMode === 'weekly' ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('student.schedule.weekly.header', { day: selectedDay })}</h2>
                </div>
                <div className="space-y-3">
                  {filteredClasses.length === 0 && (
                    <div className="text-gray-400 dark:text-gray-500">{t('student.schedule.weekly.noClasses', { day: selectedDay })}</div>
                  )}
                  {filteredClasses.map((cls, idx) => (
                    <div key={cls.id} className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${classColors[idx % classColors.length]}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium">
                          <BookOpen className="w-4 h-4 text-blue-600" /> {cls.course}
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                            <Users className="w-3.5 h-3.5" /> {cls.instructor}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                            <Clock className="w-3.5 h-3.5" /> {cls.start} - {cls.end}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                            <MapPin className="w-3.5 h-3.5" /> {cls.room}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {cls.online && (
                          <button className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700">
                            <Video className="w-3.5 h-3.5" /> {t('student.schedule.weekly.joinOnline')}
                          </button>
                        )}
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">
                          <PlusCircle className="w-3.5 h-3.5" /> {t('student.schedule.weekly.addCalendar')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => (
                    <div key={day} className="p-2 text-center font-semibold text-gray-600 dark:text-gray-400">
                      {t(`student.schedule.days.short.${day}`)}
                    </div>
                  ))}
                  {[...Array(getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()))].map((_, index) => (
                    <div key={`empty-${index}`} className="p-2 text-center" />
                  ))}
                  {[...Array(getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()))].map((_, index) => {
                    const day = index + 1;
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const isToday = new Date().toDateString() === date.toDateString();
                    const dayClasses = scheduleData.filter(cls => {
                      const classDay = weekDays.indexOf(cls.day);
                      return classDay === (date.getDay() - 1);
                    });

                    return (
                      <div
                        key={day}
                        className={`p-2 min-h-[100px] border border-gray-100 dark:border-gray-700 ${
                          isToday ? 'bg-blue-50 dark:bg-blue-900' : ''
                        }`}
                      >
                        <div className={`text-right mb-1 ${
                          isToday ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayClasses.map((cls, idx) => (
                            <div
                              key={cls.id}
                              className={`text-xs p-1 rounded ${classColors[idx % classColors.length]}`}
                            >
                              {cls.course}
                              <div className="text-gray-600 dark:text-gray-400">{cls.start}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 