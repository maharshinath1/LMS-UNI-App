import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import userData from '../../data/user';
import logo from '../../assets/marln-logo.png';
import banner from '../../assets/banner.png';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    logout();
    const user = userData.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login(user.role);
      navigate(`/${user.role}/dashboard`);
    } else {
      setError(t('auth.invalidCredentials'));
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Banner Panel */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-800 to-blue-600 relative">
        <img
          src={banner}
          alt={t('auth.bannerAlt')}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 flex flex-col justify-center h-full px-12">
          <img src={logo} alt={t('auth.logoAlt')} className="w-32 mb-6" />
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            {t('auth.heroTitle')}
          </h1>
          <p className="text-blue-100 text-lg max-w-md">
            {t('auth.heroSubtitle')}
          </p>
        </div>
        <div className="text-sm text-blue-100 text-center p-4 relative z-10">
          {t('common.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="flex flex-1 justify-center items-center bg-gray-100 px-6 sm:px-12">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
          {/* Top utility row with Language Switcher */}
          <div className="flex justify-end">
            <LanguageSwitcher className="w-auto px-3 py-2 hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
          </div>

          <div className={`text-center ${isRTL ? 'text-right' : 'text-center'}`}>
            <img src={logo} alt="MarLn" className="mx-auto w-24 mb-4" />
            <h2 className="text-2xl font-bold text-blue-700">{t('auth.signInTitle')}</h2>
            <p className="text-sm text-gray-500">{t('auth.subtitle')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('auth.email')}</label>
              <input
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                dir="ltr"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('auth.password')}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                dir="ltr"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-md transition"
            >
              {t('common.login')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
