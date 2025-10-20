import { Button } from './ui/button';
import { Card } from './ui/card';
import { Upload, FileText, Brain, Zap, Clock, Target } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const images = [
  'https://images.unsplash.com/photo-1599488059966-a42a2ab36991?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const currentIndex = images.indexOf(prev);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm">
                AI-Powered Learning
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
              Study Smarter, Not Harder.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Upload your notes, get instant summaries and quizzes. Perfect for university students managing heavy workloads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => onNavigate('upload')}
                className="gap-2 rounded-xl px-8"
              >
                <Upload className="w-5 h-5" />
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('dashboard')}
                className="rounded-xl px-8"
              >
                View Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={currentImage}
                alt="Student studying with laptop"
                className="w-full h-auto"
              />
            </div>
            {/* Floating card */}
            <Card className="absolute -bottom-6 -left-6 p-4 shadow-lg max-w-[200px] hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Quiz Score</p>
                  <p className="font-semibold">8/10 Correct</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Everything you need to excel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform helps you learn faster and retain more
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Easy Upload</h3>
            <p className="text-muted-foreground">
              Drag and drop your lecture notes in PDF, Word, or TXT format. We'll handle the rest.
            </p>
          </Card>

          <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Smart Summaries</h3>
            <p className="text-muted-foreground">
              Get AI-generated summaries organized by topics. Review key concepts in minutes.
            </p>
          </Card>

          <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Auto Quizzes</h3>
            <p className="text-muted-foreground">
              Practice with automatically generated quizzes. Get instant feedback and explanations.
            </p>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Built for busy students
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Save Hours Every Week</h4>
                    <p className="text-muted-foreground text-sm">
                      Spend less time organizing notes and more time actually learning
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Instant Summaries</h4>
                    <p className="text-muted-foreground text-sm">
                      Get comprehensive summaries in seconds, not hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Track Your Progress</h4>
                    <p className="text-muted-foreground text-sm">
                      See which topics you've mastered and where to focus next
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-accent opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className="text-6xl font-bold text-primary">85%</div>
                  <p className="text-muted-foreground">
                    Students report better grades after 2 weeks
                  </p>
                  <Button onClick={() => onNavigate('upload')} className="rounded-xl">
                    Start Learning Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
