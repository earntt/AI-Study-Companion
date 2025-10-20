import { Button } from './ui/button';
import { Card } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { FileText, Brain, ArrowLeft } from 'lucide-react';

interface SummaryPageProps {
  fileName: string;
  onNavigate: (page: string) => void;
}

const mockSummaryData = [
  {
    id: '1',
    topic: 'Introduction to Neural Networks',
    content: 'Neural networks are computing systems inspired by biological neural networks in animal brains. They consist of interconnected nodes (neurons) organized in layers: input layer, hidden layers, and output layer. Each connection has a weight that adjusts as learning proceeds, enabling the network to learn from data.',
    keyPoints: [
      'Inspired by biological neural networks',
      'Consists of interconnected nodes in layers',
      'Weights adjust during training process',
      'Can learn patterns from data'
    ]
  },
  {
    id: '2',
    topic: 'Activation Functions',
    content: 'Activation functions determine whether a neuron should be activated or not by calculating the weighted sum and adding bias. Common activation functions include ReLU (Rectified Linear Unit), Sigmoid, and Tanh. ReLU is most popular for hidden layers due to its computational efficiency and ability to mitigate vanishing gradient problem.',
    keyPoints: [
      'Decides neuron activation',
      'ReLU: max(0, x) - most common',
      'Sigmoid: outputs between 0 and 1',
      'Tanh: outputs between -1 and 1'
    ]
  },
  {
    id: '3',
    topic: 'Backpropagation Algorithm',
    content: 'Backpropagation is the fundamental algorithm for training neural networks. It works by calculating the gradient of the loss function with respect to each weight by propagating errors backward through the network. This allows the network to adjust weights to minimize prediction errors.',
    keyPoints: [
      'Training algorithm for neural networks',
      'Calculates gradients of loss function',
      'Propagates errors backward',
      'Enables weight adjustment for better predictions'
    ]
  },
  {
    id: '4',
    topic: 'Overfitting and Regularization',
    content: 'Overfitting occurs when a model learns training data too well, including noise and outliers, resulting in poor generalization to new data. Regularization techniques like L1/L2 regularization, dropout, and early stopping help prevent overfitting by adding constraints to the learning process.',
    keyPoints: [
      'Overfitting: model too specific to training data',
      'Poor performance on new data',
      'Dropout: randomly disables neurons',
      'Early stopping: halt training at optimal point'
    ]
  },
  {
    id: '5',
    topic: 'Convolutional Neural Networks (CNNs)',
    content: 'CNNs are specialized neural networks for processing grid-like data such as images. They use convolutional layers that apply filters to detect features like edges, textures, and patterns. CNNs have revolutionized computer vision tasks including image classification, object detection, and facial recognition.',
    keyPoints: [
      'Specialized for image processing',
      'Uses convolutional layers with filters',
      'Detects hierarchical features',
      'Applications: image recognition, object detection'
    ]
  }
];

export function SummaryPage({ fileName, onNavigate }: SummaryPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('upload')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Button>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold mb-2">Summary Generated</h1>
              <p className="text-muted-foreground">{fileName}</p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Topics</p>
            <p className="text-2xl font-semibold">{mockSummaryData.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Key Points</p>
            <p className="text-2xl font-semibold">
              {mockSummaryData.reduce((acc, item) => acc + item.keyPoints.length, 0)}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Pages</p>
            <p className="text-2xl font-semibold">12</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Read Time</p>
            <p className="text-2xl font-semibold">5 min</p>
          </Card>
        </div>

        {/* Summary Content */}
        <Card className="p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">AI-Generated Summary</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {mockSummaryData.map((item, index) => (
              <AccordionItem key={item.id} value={item.id} className="border rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <span className="font-semibold">{item.topic}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {item.content}
                  </p>
                  
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm font-semibold mb-3">Key Points:</p>
                    <ul className="space-y-2">
                      {item.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            onClick={() => onNavigate('quiz')}
            className="flex-1 gap-2 rounded-xl"
          >
            <Brain className="w-5 h-5" />
            Generate Quiz
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate('upload')}
            className="flex-1 rounded-xl"
          >
            Upload New Notes
          </Button>
        </div>
      </div>
    </div>
  );
}
