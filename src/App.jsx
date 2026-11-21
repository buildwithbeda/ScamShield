import React, { useState, useEffect } from 'react';
import SharedHeader from './components/SharedHeader.jsx';
import SharedFooter from './components/SharedFooter.jsx';
import Home from './pages/Home.jsx';
import Detector from './pages/Detector.jsx';
import UrlChecker from './pages/UrlChecker.jsx';
import Academy from './pages/Academy.jsx';
import AcademyLesson from './pages/AcademyLesson.jsx';
import GlobalIntelligence from './pages/GlobalIntelligence.jsx';
import SafetyGuide from './pages/SafetyGuide.jsx';
import About from './pages/About.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import { ACADEMY_LESSONS } from './academy/lessonsData.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [language, setLanguage] = useState('en');
  const [textSize, setTextSize] = useState('normal');

  // Admin Authentication State
  const [adminUser, setAdminUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check URL hash and session on mount
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin' || hash === 'admin/login') {
        setActiveTab('admin');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Verify existing admin session from server
    const verifyExistingSession = async () => {
      const token = localStorage.getItem('scamshield_admin_token');
      try {
        const res = await fetch('/api/auth/me', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAdminUser(data.admin);
            setIsAdminLoggedIn(true);
          }
        } else {
          localStorage.removeItem('scamshield_admin_token');
          setIsAdminLoggedIn(false);
          setAdminUser(null);
        }
      } catch (err) {
        // Backend offline or local fallback
      }
    };

    verifyExistingSession();

    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const getTextSizeClass = () => {
    switch (textSize) {
      case 'large':
        return 'text-size-large';
      case 'xl':
        return 'text-size-xl';
      case 'normal':
      default:
        return 'text-size-normal';
    }
  };

  const handleSelectLesson = (lessonOrId) => {
    let lesson = lessonOrId;
    if (typeof lessonOrId === 'string') {
      lesson = ACADEMY_LESSONS.find((l) => l.id === lessonOrId) || ACADEMY_LESSONS[0];
    } else if (lessonOrId && lessonOrId.id) {
      lesson = ACADEMY_LESSONS.find((l) => l.id === lessonOrId.id) || lessonOrId;
    }
    setSelectedLesson(lesson);
    setActiveTab('academy-lesson');
  };

  const handleBackToAcademy = () => {
    setActiveTab('academy');
  };

  const handleAdminLoginSuccess = (admin) => {
    setAdminUser(admin);
    setIsAdminLoggedIn(true);
    setActiveTab('admin');
  };

  const handleAdminLogout = async () => {
    try {
      const token = localStorage.getItem('scamshield_admin_token');
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
    } catch {
      // Ignore network errors on logout
    }
    localStorage.removeItem('scamshield_admin_token');
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    setActiveTab('home');
  };

  return (
    <div className={`min-h-screen bg-[#F3F6FA] text-[#243447] font-sans flex flex-col justify-between selection:bg-[#0B5CAD]/20 selection:text-[#123B64] ${getTextSizeClass()}`}>
      {/* Universal Public Service Header */}
      <SharedHeader
        activeTab={activeTab === 'academy-lesson' ? 'academy' : activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        textSize={textSize}
        setTextSize={setTextSize}
      />

      {/* Main Accessible Workspace Target */}
      <main id="main-content" tabIndex="-1" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 outline-none">
        {activeTab === 'home' && (
          <Home setActiveTab={setActiveTab} language={language} />
        )}

        {activeTab === 'detector' && (
          <Detector onNavigateToLesson={handleSelectLesson} />
        )}

        {activeTab === 'url-checker' && (
          <UrlChecker />
        )}

        {activeTab === 'academy' && (
          <Academy onSelectLesson={handleSelectLesson} />
        )}

        {activeTab === 'academy-lesson' && selectedLesson && (
          <AcademyLesson
            lesson={selectedLesson}
            onBack={handleBackToAcademy}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {activeTab === 'intelligence' && (
          <GlobalIntelligence />
        )}

        {activeTab === 'safety-guide' && (
          <SafetyGuide />
        )}

        {activeTab === 'about' && (
          <About />
        )}

        {activeTab === 'admin' && (
          isAdminLoggedIn ? (
            <AdminDashboard admin={adminUser} onLogout={handleAdminLogout} />
          ) : (
            <AdminLogin
              onLoginSuccess={handleAdminLoginSuccess}
              onBackToPublic={() => setActiveTab('home')}
            />
          )
        )}
      </main>

      {/* Universal Public Service Footer */}
      <SharedFooter setActiveTab={setActiveTab} />
    </div>
  );
}
