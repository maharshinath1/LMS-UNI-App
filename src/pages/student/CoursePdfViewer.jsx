import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function CoursePdfViewer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // PDF URL can be passed via state or query param
  const pdfUrl = location.state?.pdfUrl || '';
  const title = location.state?.title || t('student.pdfViewer.title');

  return (
    <div
      className="fixed inset-0 bg-gray-900 flex flex-col z-50 select-none"
      onContextMenu={e => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
    >
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-red-400 p-2 rounded-full"
          aria-label={t('student.pdfViewer.close')}
        >
          <X size={28} />
        </button>
      </div>
      <div className="flex-1 bg-black relative">
        {pdfUrl ? (
          <>
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title={t('student.pdfViewer.iframeTitle')}
              className="w-full h-full min-h-[80vh] pointer-events-auto"
              style={{ border: 'none', pointerEvents: 'auto' }}
              allowFullScreen
            ></iframe>
            {/* Overlay to block interaction (optional, uncomment to block all interaction) */}
            {/* <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }} /> */}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">{t('student.pdfViewer.notFound')}</div>
        )}
      </div>
    </div>
  );
}

export default CoursePdfViewer; 