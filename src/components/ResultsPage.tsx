import { Button } from './ui/button';
import { Card } from './ui/card';
import { Trophy, TrendingUp, RotateCcw, Upload, ArrowLeft } from 'lucide-react';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultsPageProps {
  score: number;
  total: number;
  onNavigate: (page: string) => void;
}

const topicPerformance = [
  { topic: 'Neural Networks', score: 90, total: 100 },
  { topic: 'Activation Functions', score: 75, total: 100 },
  { topic: 'Backpropagation', score: 85, total: 100 },
  { topic: 'Overfitting', score: 80, total: 100 },
  { topic: 'CNNs', score: 70, total: 100 }
];

export function ResultsPage({ score, total, onNavigate }: ResultsPageProps) {
  const percentage = Math.round((score / total) * 100);
  const isPassing = percentage >= 70;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { title: 'Outstanding!', message: 'You have excellent understanding of the material.' };
    if (percentage >= 80) return { title: 'Great Job!', message: 'You have a strong grasp of the concepts.' };
    if (percentage >= 70) return { title: 'Well Done!', message: 'You passed! Keep up the good work.' };
    if (percentage >= 60) return { title: 'Almost There!', message: 'Review the material and try again.' };
    return { title: 'Keep Learning!', message: 'Practice makes perfect. Review and retry.' };
  };

  const performanceMessage = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('quiz')}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quiz
        </Button>

        {/* Score Card */}
        <Card className={`p-8 md:p-12 mb-8 text-center ${
          isPassing ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20' : 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20'
        }`}>
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isPassing ? 'bg-green-100 dark:bg-green-900' : 'bg-orange-100 dark:bg-orange-900'
          }`}>
            <Trophy className={`w-10 h-10 ${
              isPassing ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
            }`} />
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-2">
            {score}/{total}
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            {percentage}% Correct
          </p>

          <div className="max-w-md mx-auto mb-6">
            <Progress value={percentage} className="h-3" />
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            {performanceMessage.title}
          </h2>
          <p className="text-muted-foreground">
            {performanceMessage.message}
          </p>
        </Card>

        {/* Performance Breakdown */}
        <Card className="p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Topic Performance</h2>
          </div>

          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="topic" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    padding: '8px 12px'
                  }}
                  formatter={(value) => [`${value}%`, 'Score']}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {topicPerformance.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.score >= 80 ? '#4F8FC0' : entry.score >= 60 ? '#FFD166' : '#EF4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicPerformance.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <span className="text-sm font-medium">{topic.topic}</span>
                <div className="flex items-center gap-2">
                  <Progress value={topic.score} className="w-24 h-2" />
                  <span className="text-sm font-semibold w-12 text-right">{topic.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Insights */}
        <Card className="p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Study Insights</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/20">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">💪</span>
              </div>
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100 mb-1">Strong Topics</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You excelled in Neural Networks and Backpropagation. Great work!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20">
              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">📚</span>
              </div>
              <div>
                <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">Areas to Review</p>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Consider reviewing CNNs and Activation Functions to strengthen your understanding.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">💡</span>
              </div>
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Study Tip</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Try taking the quiz again in 24 hours to reinforce your learning and improve retention.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate('quiz')}
            className="gap-2 rounded-xl"
          >
            <RotateCcw className="w-5 h-5" />
            Retry Quiz
          </Button>
          <Button
            size="lg"
            onClick={() => onNavigate('upload')}
            className="gap-2 rounded-xl"
          >
            <Upload className="w-5 h-5" />
            Upload New Notes
          </Button>
        </div>

        {/* Study Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Questions</p>
            <p className="text-2xl font-semibold">{total}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Correct</p>
            <p className="text-2xl font-semibold text-green-600">{score}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Incorrect</p>
            <p className="text-2xl font-semibold text-red-600">{total - score}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Time</p>
            <p className="text-2xl font-semibold">12m</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
