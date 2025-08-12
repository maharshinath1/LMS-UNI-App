import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { BookOpen, Users2, ClipboardList, Calendar, BarChart2, MessageCircle, FileText, CheckCircle, TrendingUp, Bell, Award, Library, Clock, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const stats = [
  { labelKey: 'student.dashboard.stats.enrolledCourses', value: '5', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
  { labelKey: 'student.dashboard.stats.pendingAssignments', value: '3', icon: ClipboardList, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { labelKey: 'student.dashboard.stats.averageGrade', value: '85%', icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
  { labelKey: 'student.dashboard.stats.nextClass', value: 'Math 101', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const messages = [
  { name: 'Dr. Emily Carter', time: '10:15 AM', msg: 'Your assignment has been graded. Great work!', avatar: '', color: 'bg-blue-200' },
  { name: 'Study Group', time: 'Yesterday', msg: 'Meeting tomorrow at 2 PM in Library', avatar: '', color: 'bg-green-200' },
  { name: 'Academic Advisor', time: '2 days ago', msg: 'Course registration opens next week', avatar: '', color: 'bg-yellow-200' },
];

const activities = [
  { icon: CheckCircle, desc: 'Submitted Math Assignment #3', time: '2 hours ago', color: 'text-blue-600' },
  { icon: Award, desc: 'Received A+ in Physics Lab', time: '1 day ago', color: 'text-green-600' },
  { icon: FileText, desc: 'Downloaded Chemistry Notes', time: '2 days ago', color: 'text-yellow-600' },
  { icon: Users2, desc: 'Joined Study Group', time: '3 days ago', color: 'text-purple-600' },
];

const upcomingClasses = [
  { time: '9:00 AM', title: 'Mathematics 101', room: 'Room 302, Building A', instructor: 'Dr. Emily Carter' },
  { time: '1:00 PM', title: 'Physics 201', room: 'Room 105, Building B', instructor: 'Prof. David Kim' },
  { time: '3:30 PM', title: 'Chemistry Lab', room: 'Lab 203, Science Building', instructor: 'Dr. Sarah Lee' },
];

const courseProgress = [
  { name: 'Mathematics 101', progress: 75, color: 'bg-blue-500' },
  { name: 'Physics 201', progress: 60, color: 'bg-green-500' },
  { name: 'Chemistry 101', progress: 85, color: 'bg-yellow-500' },
  { name: 'Computer Science 101', progress: 90, color: 'bg-purple-500' },
];

const upcomingAssignments = [
  {
    course: 'Mathematics 101',
    title: 'Linear Algebra Assignment',
    dueDate: '2024-03-20',
    daysLeft: 3,
    status: 'pending',
    priority: 'high'
  },
  {
    course: 'Physics 201',
    title: 'Lab Report: Wave Motion',
    dueDate: '2024-03-22',
    daysLeft: 5,
    status: 'in-progress',
    priority: 'medium'
  },
  {
    course: 'Chemistry 101',
    title: 'Chemical Reactions Quiz',
    dueDate: '2024-03-25',
    daysLeft: 8,
    status: 'not-started',
    priority: 'low'
  }
];

const studyProgress = [
  { labelKey: 'student.dashboard.studyProgress.attendanceRate', value: '92%', icon: Users2, trend: '+2.5%' },
  { labelKey: 'student.dashboard.studyProgress.studyHours', value: '24h', icon: Clock, trend: '+5h' },
  { labelKey: 'student.dashboard.studyProgress.completedTasks', value: '18/20', icon: CheckCircle, trend: '+3' },
  { labelKey: 'student.dashboard.studyProgress.currentGpa', value: '3.8', icon: Award, trend: '+0.2' }
];

const quickActions = [
  { labelKey: 'student.dashboard.widgets.buttons.courseMaterials', icon: FileText, color: 'blue' },
  { labelKey: 'student.dashboard.widgets.buttons.assignments', icon: ClipboardList, color: 'purple' },
  { labelKey: 'student.dashboard.widgets.buttons.schedule', icon: Calendar, color: 'yellow' },
  { labelKey: 'student.dashboard.widgets.buttons.grades', icon: Award, color: 'green' }
];

const upcomingDeadlines = [
  { 
    type: 'Assignment',
    course: 'Mathematics 101',
    title: 'Linear Algebra Quiz',
    deadline: '2024-03-22',
    priority: 'high'
  },
  {
    type: 'Project',
    course: 'Computer Science',
    title: 'Database Design',
    deadline: '2024-03-25',
    priority: 'medium'
  }
];

function AnimatedBar({ value, color }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    setDisplayed(0);
    const timeout = setTimeout(() => setDisplayed(value), 100);
    return () => clearTimeout(timeout);
  }, [value]);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`${color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${displayed}%` }}></div>
    </div>
  );
}

function AnimatedNumber({ value }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = () => {
      if (start < value) {
        start += Math.ceil(value / 30);
        setDisplayed(start > value ? value : start);
        requestAnimationFrame(step);
      }
    };
    step();
  }, [value]);
  return <span>{displayed}</span>;
}

export default function StudentDashboard() {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto p-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.labelKey} className={`rounded-xl shadow p-6 flex items-center gap-4 ${stat.bg} dark:bg-gray-800`}>
              <stat.icon size={36} className={stat.color} />
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100"><AnimatedNumber value={parseInt(stat.value)} /></div>
                <div className="text-gray-500 dark:text-gray-300 text-sm">{t(stat.labelKey)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Academic Performance */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold text-gray-700 dark:text-gray-100">{t('student.dashboard.academicPerformance.title')}</div>
                <select className="border rounded px-2 py-1 text-sm dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
                  <option>{t('student.dashboard.academicPerformance.semester.this')}</option>
                  <option>{t('student.dashboard.academicPerformance.semester.last')}</option>
                </select>
              </div>
              <div className="space-y-4">
                {courseProgress.map((course) => (
                  <div key={course.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{course.name}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{course.progress}%</span>
                    </div>
                    <AnimatedBar value={course.progress} color={course.color} />
                  </div>
                ))}
              </div>
            </div>

            {/* Study Progress Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {studyProgress.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <item.icon size={18} className="text-blue-600" />
                    <span className={`text-xs font-medium ${
                      item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>{item.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{item.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">{t(item.labelKey)}</div>
                </div>
              ))}
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" />
                  <span className="font-medium text-gray-700 dark:text-gray-100">{t('student.dashboard.upcomingAssignments.title')}</span>
                </div>
                <a href="#" className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center">
                  {t('student.dashboard.upcomingAssignments.viewAll')}
                  <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="space-y-1">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        assignment.course.includes('Mathematics') ? 'bg-blue-50 dark:bg-blue-900' :
                        assignment.course.includes('Physics') ? 'bg-purple-50 dark:bg-purple-900' :
                        'bg-green-50 dark:bg-green-900'
                      }`}>
                        <span className={`text-sm font-medium ${
                          assignment.course.includes('Mathematics') ? 'text-blue-600 dark:text-blue-300' :
                          assignment.course.includes('Physics') ? 'text-purple-600 dark:text-purple-300' :
                          'text-green-600 dark:text-green-300'
                        }`}>
                          {assignment.course.split(' ')[0][0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{assignment.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">{assignment.course}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{t('student.dashboard.upcomingAssignments.dueOn', { date: `Mar ${assignment.dueDate.split('-')[2]}` })}</div>
                        <div className="text-xs text-red-500">{t('student.dashboard.upcomingAssignments.daysLeft_other', { count: assignment.daysLeft })}</div>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${
                        assignment.status === 'pending' ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300' :
                        assignment.status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' :
                        'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}>
                        {t(`student.dashboard.upcomingAssignments.status.${assignment.status}`)}
                      </div>
                      <svg className="w-3 h-3 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Schedule */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="font-semibold text-gray-700 dark:text-gray-100 mb-4">{t('student.dashboard.schedule.today')}</div>
              <div className="space-y-4">
                {upcomingClasses.map((class_, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{class_.time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{class_.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">{class_.room}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">{t('student.dashboard.schedule.instructor', { name: class_.instructor })}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Deadlines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
              <h2 className="font-semibold text-gray-700 dark:text-gray-100 mb-4">{t('student.dashboard.deadlines.title')}</h2>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      deadline.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{deadline.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{deadline.course}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">{t('student.dashboard.deadlines.due', { date: new Date(deadline.deadline).toLocaleDateString() })}</div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-700 ml-auto dark:bg-gray-700 dark:text-gray-200">
                      {deadline.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="font-semibold text-gray-700 dark:text-gray-100 mb-4">{t('student.dashboard.resources.title')}</h2>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center dark:bg-purple-900">
                    <Library size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('student.dashboard.resources.digitalLibrary.title')}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{t('student.dashboard.resources.digitalLibrary.subtitle')}</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center dark:bg-green-900">
                    <Users2 size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('student.dashboard.resources.studyGroups.title')}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{t('student.dashboard.resources.studyGroups.subtitle')}</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                    <MessageCircle size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('student.dashboard.resources.academicSupport.title')}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{t('student.dashboard.resources.academicSupport.subtitle')}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Messages */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
            <div className="font-semibold text-gray-700 dark:text-gray-100 mb-4 flex items-center gap-2">
              <MessageCircle size={18}/> {t('student.dashboard.widgets.messages')}
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.color} dark:bg-blue-600`}>
                    <Users2 size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{msg.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{msg.msg}</div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-300 whitespace-nowrap">{msg.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
            <div className="font-semibold text-gray-700 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Bell size={18}/> {t('student.dashboard.widgets.recentActivities')}
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <activity.icon size={22} className={activity.color} />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{activity.desc}</div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-300 whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
            <div className="font-semibold text-gray-700 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Library size={18}/> {t('student.dashboard.widgets.quickLinks')}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-lg bg-${action.color}-50 text-${action.color}-600 hover:bg-${action.color}-100 transition-colors dark:bg-${action.color}-900 dark:text-${action.color}-400 dark:hover:bg-${action.color}-800`}
                >
                  <action.icon size={20} className="mx-auto mb-1" />
                  <span className="text-sm">{t(action.labelKey)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
