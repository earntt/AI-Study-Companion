import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle2, XCircle, ChevronRight, ArrowLeft, Lightbulb } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface QuizPageProps {
  onNavigate: (page: string, data?: any) => void;
}

const mockQuestions = [
  {
    id: 1,
    question: 'What are the three main layers in a basic neural network?',
    options: [
      'Input layer, hidden layer, output layer',
      'Forward layer, backward layer, middle layer',
      'Data layer, processing layer, result layer',
      'Start layer, compute layer, end layer'
    ],
    correctAnswer: 0,
    explanation: 'A basic neural network consists of three main layers: the input layer (receives data), hidden layer(s) (processes data), and output layer (produces results). This architecture allows the network to learn complex patterns through multiple layers of transformation.'
  },
  {
    id: 2,
    question: 'Which activation function is most commonly used in hidden layers?',
    options: [
      'Sigmoid',
      'ReLU (Rectified Linear Unit)',
      'Tanh',
      'Softmax'
    ],
    correctAnswer: 1,
    explanation: 'ReLU (Rectified Linear Unit) is the most popular activation function for hidden layers because it is computationally efficient and helps mitigate the vanishing gradient problem. It outputs the input directly if positive, otherwise outputs zero.'
  },
  {
    id: 3,
    question: 'What is the primary purpose of backpropagation?',
    options: [
      'To increase network speed',
      'To calculate gradients and adjust weights',
      'To reduce the number of layers',
      'To prevent overfitting'
    ],
    correctAnswer: 1,
    explanation: 'Backpropagation is the fundamental training algorithm that calculates the gradient of the loss function with respect to each weight. It propagates errors backward through the network, allowing weights to be adjusted to minimize prediction errors.'
  },
  {
    id: 4,
    question: 'Which technique helps prevent overfitting by randomly disabling neurons?',
    options: [
      'Batch normalization',
      'Early stopping',
      'Dropout',
      'Data augmentation'
    ],
    correctAnswer: 2,
    explanation: 'Dropout is a regularization technique that randomly disables (drops out) neurons during training. This prevents the network from becoming too dependent on specific neurons and helps improve generalization to new data.'
  },
  {
    id: 5,
    question: 'What type of neural network is specialized for image processing?',
    options: [
      'Recurrent Neural Network (RNN)',
      'Convolutional Neural Network (CNN)',
      'Generative Adversarial Network (GAN)',
      'Long Short-Term Memory (LSTM)'
    ],
    correctAnswer: 1,
    explanation: 'Convolutional Neural Networks (CNNs) are specifically designed for processing grid-like data such as images. They use convolutional layers with filters to detect hierarchical features like edges, textures, and complex patterns, making them ideal for computer vision tasks.'
  },
  {
    id: 6,
    question: 'What happens when a model is overfitted?',
    options: [
      'It performs well on both training and test data',
      'It performs poorly on training data but well on test data',
      'It performs well on training data but poorly on new data',
      'It cannot learn from the training data'
    ],
    correctAnswer: 2,
    explanation: 'An overfitted model has learned the training data too well, including noise and outliers. While it performs excellently on training data, it fails to generalize to new, unseen data because it has memorized specific examples rather than learning general patterns.'
  },
  {
    id: 7,
    question: 'Which component in a CNN is responsible for detecting features in images?',
    options: [
      'Pooling layer',
      'Fully connected layer',
      'Convolutional layer with filters',
      'Activation function'
    ],
    correctAnswer: 2,
    explanation: 'Convolutional layers with filters are the core building blocks of CNNs. These filters (also called kernels) slide across the input image to detect specific features like edges, corners, and textures at different levels of abstraction.'
  },
  {
    id: 8,
    question: 'What does the sigmoid activation function output?',
    options: [
      'Values between -1 and 1',
      'Values between 0 and 1',
      'Only positive values',
      'Any real number'
    ],
    correctAnswer: 1,
    explanation: 'The sigmoid function outputs values between 0 and 1, making it useful for binary classification problems. However, it can suffer from vanishing gradients in deep networks, which is why ReLU is often preferred for hidden layers.'
  },
  {
    id: 9,
    question: 'What is L2 regularization also known as?',
    options: [
      'Lasso',
      'Ridge',
      'Elastic Net',
      'Dropout'
    ],
    correctAnswer: 1,
    explanation: 'L2 regularization is also known as Ridge regularization. It adds a penalty term proportional to the square of the weights to the loss function, which encourages smaller weights and helps prevent overfitting.'
  },
  {
    id: 10,
    question: 'In neural networks, what is an epoch?',
    options: [
      'A single training example',
      'One complete pass through the entire training dataset',
      'The time taken to train the model',
      'The number of layers in the network'
    ],
    correctAnswer: 1,
    explanation: 'An epoch represents one complete pass through the entire training dataset. During each epoch, the model sees every training example once. Training typically involves multiple epochs to allow the model to learn patterns effectively.'
  }
];

export function QuizPage({ onNavigate }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(mockQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(null);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = selectedAnswers.filter(
      (answer, idx) => answer === mockQuestions[idx].correctAnswer
    ).length;
    onNavigate('results', { score, total: mockQuestions.length });
  };

  const isAnswered = selectedAnswers[currentQuestion] !== null;
  const isCorrect = selectedAnswers[currentQuestion] === mockQuestions[currentQuestion].correctAnswer;
  const allAnswered = selectedAnswers.every(answer => answer !== null);
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  const question = mockQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('summary', { fileName: 'Neural Networks - Lecture 3.pdf' })}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Summary
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Practice Quiz</h1>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {currentQuestion + 1} / {mockQuestions.length}
            </Badge>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-6 md:p-8 mb-6">
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-semibold text-primary">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{question.question}</h2>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                const isCorrectOption = index === question.correctAnswer;
                const showFeedback = isAnswered;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      showFeedback
                        ? isCorrectOption
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                          : isSelected
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                          : 'border-border bg-card'
                        : isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        showFeedback && isCorrectOption
                          ? 'border-green-500 bg-green-500'
                          : showFeedback && isSelected && !isCorrectOption
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/30'
                      }`}>
                        {showFeedback && isCorrectOption && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                        {showFeedback && isSelected && !isCorrectOption && (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                        {!showFeedback && isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className={showFeedback && isCorrectOption ? 'font-medium' : ''}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={`rounded-xl p-4 ${
              isCorrect ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
            }`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold mb-2 ${
                    isCorrect ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  
                  <Collapsible open={showExplanation === currentQuestion}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExplanation(
                          showExplanation === currentQuestion ? null : currentQuestion
                        )}
                        className="gap-2 px-0 h-auto"
                      >
                        <Lightbulb className="w-4 h-4" />
                        {showExplanation === currentQuestion ? 'Hide' : 'Show'} Explanation
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {question.explanation}
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="rounded-xl"
          >
            Previous
          </Button>
          
          {currentQuestion < mockQuestions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex-1 gap-2 rounded-xl"
            >
              Next Question
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="flex-1 rounded-xl"
            >
              Submit Quiz
            </Button>
          )}
        </div>

        {/* Question Overview */}
        <Card className="mt-8 p-6">
          <h3 className="font-semibold mb-4">Question Overview</h3>
          <div className="flex flex-wrap gap-2">
            {mockQuestions.map((_, index) => {
              const answered = selectedAnswers[index] !== null;
              const correct = selectedAnswers[index] === mockQuestions[index].correctAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuestion(index);
                    setShowExplanation(null);
                  }}
                  className={`w-10 h-10 rounded-lg border-2 font-semibold transition-all ${
                    index === currentQuestion
                      ? 'border-primary bg-primary text-primary-foreground'
                      : answered && correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300'
                      : answered && !correct
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
