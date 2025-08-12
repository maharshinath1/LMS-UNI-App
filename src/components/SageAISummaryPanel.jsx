import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles } from 'lucide-react';
import { useTypewriter } from '../utils/typewriterEffect';
import { useTranslation } from 'react-i18next';

const SageAISummaryPanel = ({ 
  isOpen, 
  onClose, 
  videoTitle, 
  summary, 
  className = '' 
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  
  const { displayedText, isTyping, isComplete, startTyping, reset } = useTypewriter(summary, {
    speed: 10, // Faster typing speed (was 25)
    delay: 200, // Shorter delay before starting (was 300)
    autoStart: false, // Don't auto-start, we'll control it manually
    onComplete: () => {
      // Optional: Add completion callback
    }
  });

  // Control typewriter animation manually when panel opens
  useEffect(() => {
    if (isOpen && summary && !isTyping && !isComplete) {
      // Only start typing if not already typing and not complete
      reset();
      setTimeout(() => {
        startTyping();
      }, 150); // Faster initial delay (was 300)
    }
  }, [isOpen, summary, isTyping, isComplete, reset, startTyping]);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = summary;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${className} ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxWidth: 'min(400px, 100vw)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('student.sageAI.panel.summaryTitle')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('student.sageAI.panel.poweredBy')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('student.sageAI.panel.closeAria')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Video Title */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text_base font-medium text-gray-900 dark:text-gray-100 mb-2">
              {t('student.sageAI.panel.videoTitle')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {videoTitle}
            </p>
          </div>

          {/* Summary Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">
                {t('student.sageAI.panel.aiGenerated')}
              </h3>
              
              {/* Typewriter Effect */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[200px]">
                {summary ? (
                  <>
                    <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {displayedText}
                      {isTyping && (
                        <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
                      )}
                    </div>
                    
                    {/* Progress indicator */}
                    {isTyping && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <span>{t('student.sageAI.panel.generating')}</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">{t('student.sageAI.panel.noSummary')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Copy Button */}
            {isComplete && (
              <button
                onClick={handleCopySummary}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    {t('student.sageAI.panel.copy.copied')}
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    {t('student.sageAI.panel.copy.button')}
                  </>
                )}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>{t('student.sageAI.panel.footer.line1')}</p>
              <p className="mt-1">{t('student.sageAI.panel.footer.line2')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SageAISummaryPanel;
