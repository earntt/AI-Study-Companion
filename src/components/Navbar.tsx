import { BookOpen, Home, Upload, FileText, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navbar({ currentPage, onNavigate, darkMode, toggleDarkMode }: NavbarProps) {
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">AI Study Companion</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant={currentPage === 'landing' ? 'secondary' : 'ghost'}
              onClick={() => onNavigate('landing')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button
              variant={currentPage === 'upload' ? 'secondary' : 'ghost'}
              onClick={() => onNavigate('upload')}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload
            </Button>
            <Button
              variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
              onClick={() => onNavigate('dashboard')}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              My Quizzes
            </Button>
          </div>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
