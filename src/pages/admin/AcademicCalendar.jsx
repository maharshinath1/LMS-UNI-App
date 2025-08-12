import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { calendarEvents as initialEvents } from '../../data/calendar';
import { Plus, Trash2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const eventTypes = [
  { value: 'event', label: 'Event' },
  { value: 'exam', label: 'Exam' },
  { value: 'holiday', label: 'Holiday' }
];

export default function AcademicCalendar() {
  const { t } = useTranslation();
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('calendarEvents');
    return stored ? JSON.parse(stored) : initialEvents;
  });
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', type: '', description: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length ? Math.max(...events.map(ev => ev.id)) + 1 : 1,
      ...form
    };
    setEvents([...events, newEvent]);
    setShowAddModal(false);
    setForm({ title: '', date: '', type: '', description: '' });
  };

  const handleDelete = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('admin.academicCalendar.title')}</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>{t('admin.academicCalendar.buttons.addEvent')}</span>
            </button>
          </div>

          {/* Event List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.academicCalendar.table.title')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.academicCalendar.table.date')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.academicCalendar.table.type')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.academicCalendar.table.description')}</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.academicCalendar.table.actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {events.map(ev => (
                  <tr key={ev.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{ev.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 dark:text-blue-400">{ev.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                      <span className={
                        ev.type === 'exam' ? 'text-red-600 dark:text-red-400' :
                        ev.type === 'holiday' ? 'text-green-600 dark:text-green-400' :
                        'text-gray-700 dark:text-gray-200'
                      }>
                        {t(`admin.academicCalendar.types.${ev.type}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ev.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(ev.id)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('admin.academicCalendar.addModal.title')}</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.academicCalendar.addModal.fields.title')}</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.academicCalendar.addModal.fields.date')}</label>
                <input type="date" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.academicCalendar.addModal.fields.type')}</label>
                <select className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="">{t('admin.academicCalendar.addModal.fields.selectType')}</option>
                  {eventTypes.map(ti => <option key={ti.value} value={ti.value}>{t(`admin.academicCalendar.types.${ti.value}`)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.academicCalendar.addModal.fields.description')}</label>
                <textarea className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">{t('admin.academicCalendar.buttons.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{t('admin.academicCalendar.buttons.add')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 