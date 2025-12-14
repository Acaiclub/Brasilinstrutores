
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InstructorList from './components/InstructorList';
import VideoLibrary from './components/VideoLibrary';
import AIAssistant from './components/AIAssistant';
import Home from './components/Home';
import AuthModal from './components/AuthModal';
import StudentDashboard from './components/StudentDashboard';
import { User, LessonBooking } from './types';

type View = 'home' | 'instructors' | 'videos' | 'ai' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [myBookings, setMyBookings] = useState<LessonBooking[]>([]);

  const handleBookingSuccess = (booking: LessonBooking) => {
    setMyBookings(prev => [booking, ...prev]);
    setCurrentView('dashboard');
  };

  const handleLoginRequired = (nextView?: View) => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'instructors':
        return (
          <InstructorList 
            user={user} 
            onLoginRequired={() => setShowAuthModal(true)}
            onBookingComplete={handleBookingSuccess}
          />
        );
      case 'videos':
        return <VideoLibrary />;
      case 'ai':
        return <AIAssistant />;
      case 'dashboard':
        return <StudentDashboard bookings={myBookings} user={user} />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        user={user} 
        onLoginClick={() => setShowAuthModal(true)} 
        onLogout={() => { setUser(null); setCurrentView('home'); }}
      />
      
      <main className="flex-grow">
        {renderView()}
      </main>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={(u) => { setUser(u); setShowAuthModal(false); }} 
        />
      )}

      {/* Footer Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-50">
        <button onClick={() => setCurrentView('home')} className={`flex flex-col items-center ${currentView === 'home' ? 'text-blue-600' : 'text-slate-500'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[10px] mt-1">Início</span>
        </button>
        <button onClick={() => setCurrentView('instructors')} className={`flex flex-col items-center ${currentView === 'instructors' ? 'text-blue-600' : 'text-slate-500'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span className="text-[10px] mt-1">Instrutores</span>
        </button>
        <button onClick={() => user ? setCurrentView('dashboard') : setShowAuthModal(true)} className={`flex flex-col items-center ${currentView === 'dashboard' ? 'text-blue-600' : 'text-slate-500'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-[10px] mt-1">Minhas Aulas</span>
        </button>
        <button onClick={() => setCurrentView('ai')} className={`flex flex-col items-center ${currentView === 'ai' ? 'text-blue-600' : 'text-slate-500'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span className="text-[10px] mt-1">IA</span>
        </button>
      </nav>

      <footer className="hidden md:block bg-slate-100 py-12 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2025 AutoConecta - A revolução do ensino de trânsito independente.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
