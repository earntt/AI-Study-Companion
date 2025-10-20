import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { UploadPage } from './components/UploadPage';
import { SummaryPage } from './components/SummaryPage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { DashboardPage } from './components/DashboardPage';
import { Toaster } from './components/ui/sonner';
import { Upload } from 'lucide-react';
import { Button } from './components/ui/button';

type PageType = 'landing' | 'upload' | 'summary' | 'quiz' | 'results' | 'dashboard';

interface PageData {
  fileName?: string;
  score?: number;
  total?: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [pageData, setPageData] = useState<PageData>({});
  const [darkMode, setDarkMode] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Show floating action button when not on landing or upload page
    setShowFloatingButton(currentPage !== 'landing' && currentPage !== 'upload');
  }, [currentPage]);

  const handleNavigate = (page: PageType, data?: PageData) => {
    setCurrentPage(page);
    if (data) {
      setPageData(data);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'upload':
        return <UploadPage onNavigate={handleNavigate} />;
      case 'summary':
        return (
          <SummaryPage
            fileName={pageData.fileName || 'Neural Networks - Lecture 3.pdf'}
            onNavigate={handleNavigate}
          />
        );
      case 'quiz':
        return <QuizPage onNavigate={handleNavigate} />;
      case 'results':
        return (
          <ResultsPage
            score={pageData.score || 8}
            total={pageData.total || 10}
            onNavigate={handleNavigate}
          />
        );
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      {renderPage()}
      
      {/* Floating Action Button */}
      {showFloatingButton && (
        <Button
          onClick={() => handleNavigate('upload')}
          size="lg"
          className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all"
        >
          <Upload className="w-6 h-6" />
        </Button>
      )}

      <Toaster position="top-right" />
    </div>
  );
}
