import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { 
  Bell,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar,
  BookOpen,
  FileText,
  Award,
  Clock,
  ChevronRight,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const notifications = [
  {
    id: 1,
    type: 'assignment',
    title: 'Programming Assignment Due',
    message: 'Your Data Structures assignment is due in 2 days',
    course: 'Data Structures and Algorithms',
    time: '10 minutes ago',
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'grade',
    title: 'Grade Posted',
    message: 'Your grade for Web Development Project has been posted',
    course: 'Web Development',
    time: '1 hour ago',
    read: false,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'announcement',
    title: 'Course Schedule Update',
    message: 'The next lecture has been rescheduled to Friday',
    course: 'Database Systems',
    time: '2 hours ago',
    read: true,
    priority: 'medium'
  },
  {
    id: 4,
    type: 'material',
    title: 'New Course Material',
    message: 'New lecture notes have been uploaded for your review',
    course: 'Introduction to Computer Science',
    time: '3 hours ago',
    read: true,
    priority: 'low'
  },
  {
    id: 5,
    type: 'exam',
    title: 'Exam Schedule',
    message: 'Final exam schedule has been published',
    course: 'All Courses',
    time: '1 day ago',
    read: true,
    priority: 'high'
  }
];

function Notifications() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' ? true : notification.type === selectedType;
    const matchesPriority = selectedPriority === 'all' ? true : notification.priority === selectedPriority;
    return matchesSearch && matchesType && matchesPriority;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'grade':
        return <Award className="h-6 w-6 text-green-500" />;
      case 'announcement':
        return <Info className="h-6 w-6 text-yellow-500" />;
      case 'material':
        return <BookOpen className="h-6 w-6 text-purple-500" />;
      case 'exam':
        return <Calendar className="h-6 w-6 text-red-500" />;
      default:
        return <Bell className="h-6 w-6 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('student.notifications.title')}</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            >
              <Filter size={20} />
              {t('student.notifications.filters')}
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow mb-6 p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder={t('student.notifications.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              />
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{t('student.notifications.types.all')}</option>
                  <option value="assignment">{t('student.notifications.types.assignment')}</option>
                  <option value="grade">{t('student.notifications.types.grade')}</option>
                  <option value="announcement">{t('student.notifications.types.announcement')}</option>
                  <option value="material">{t('student.notifications.types.material')}</option>
                  <option value="exam">{t('student.notifications.types.exam')}</option>
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{t('student.notifications.priorities.all')}</option>
                  <option value="high">{t('student.notifications.priorities.high')}</option>
                  <option value="medium">{t('student.notifications.priorities.medium')}</option>
                  <option value="low">{t('student.notifications.priorities.low')}</option>
                </select>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow duration-200 ${
                  !notification.read ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{notification.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{notification.course}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                            {t(`student.notifications.priorities.${notification.priority}`)}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{notification.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('student.notifications.empty.title')}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t('student.notifications.empty.subtitle')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications; 