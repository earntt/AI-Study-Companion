import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { FileText, Trophy, Clock, TrendingUp, Upload } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string, data?: any) => void;
}

const recentUploads = [
  {
    id: 1,
    name: 'Neural Networks - Lecture 3.pdf',
    date: '2 hours ago',
    topics: 5,
    quizScore: 80,
    quizTotal: 10,
    status: 'completed'
  },
  {
    id: 2,
    name: 'Database Management Systems.docx',
    date: '1 day ago',
    topics: 8,
    quizScore: 72,
    quizTotal: 10,
    status: 'completed'
  },
  {
    id: 3,
    name: 'Pharmacology Notes - Week 4.pdf',
    date: '2 days ago',
    topics: 6,
    quizScore: 90,
    quizTotal: 10,
    status: 'completed'
  },
  {
    id: 4,
    name: 'Operating Systems Concepts.txt',
    date: '3 days ago',
    topics: 7,
    quizScore: 0,
    quizTotal: 10,
    status: 'pending'
  }
];

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">My Quizzes</h1>
          <p className="text-muted-foreground">Track your progress and review past materials</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-semibold mb-1">24</p>
            <p className="text-sm text-muted-foreground">Total Uploads</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-semibold mb-1">82%</p>
            <p className="text-sm text-muted-foreground">Avg. Score</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-semibold mb-1">15h</p>
            <p className="text-sm text-muted-foreground">Study Time</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-semibold mb-1">+12%</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </Card>
        </div>

        {/* Recent Uploads */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Materials</h2>
            <Button onClick={() => onNavigate('upload')} className="gap-2 rounded-xl">
              <Upload className="w-4 h-4" />
              Upload New
            </Button>
          </div>

          <div className="grid gap-4">
            {recentUploads.map((upload) => (
              <Card key={upload.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* File Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{upload.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{upload.date}</span>
                          <span>•</span>
                          <span>{upload.topics} topics</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quiz Score */}
                  <div className="flex items-center gap-4">
                    {upload.status === 'completed' ? (
                      <>
                        <div className="text-center">
                          <div className="flex items-center gap-2 mb-1">
                            <Trophy className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Quiz Score</span>
                          </div>
                          <p className="text-xl font-semibold">
                            {upload.quizScore}/{upload.quizTotal}
                          </p>
                          <Badge 
                            variant={upload.quizScore >= 7 ? 'default' : 'secondary'}
                            className="mt-1"
                          >
                            {Math.round((upload.quizScore / upload.quizTotal) * 100)}%
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onNavigate('summary', { fileName: upload.name })}
                            className="rounded-lg"
                          >
                            View Summary
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => onNavigate('quiz')}
                            className="rounded-lg"
                          >
                            Retry Quiz
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Badge variant="secondary">Quiz Pending</Badge>
                        <Button
                          size="sm"
                          onClick={() => onNavigate('summary', { fileName: upload.name })}
                          className="rounded-lg"
                        >
                          View Summary
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <Card className="p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">Weekly Performance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Engineering</span>
                <span className="text-sm font-semibold">85%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pharmacology</span>
                <span className="text-sm font-semibold">92%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database Systems</span>
                <span className="text-sm font-semibold">78%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
