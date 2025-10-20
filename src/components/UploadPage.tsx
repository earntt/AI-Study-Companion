import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Upload, FileText, File, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UploadPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function UploadPage({ onNavigate }: UploadPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (validTypes.includes(file.type)) {
      setSelectedFile(file);
      toast.success(`File "${file.name}" selected successfully!`);
    } else {
      toast.error('Please upload a PDF, Word, or TXT file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate upload and processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            toast.success('File processed successfully!');
            onNavigate('summary', { fileName: selectedFile.name });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getFileIcon = () => {
    if (!selectedFile) return <FileText className="w-8 h-8" />;
    
    if (selectedFile.type === 'application/pdf') {
      return <File className="w-8 h-8 text-destructive" />;
    } else if (selectedFile.type.includes('word')) {
      return <File className="w-8 h-8 text-primary" />;
    } else {
      return <FileText className="w-8 h-8 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-4">Upload Your Study Materials</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your lecture notes and let our AI create summaries and quizzes for you
          </p>
        </div>

        <Card className="p-8 md:p-12 space-y-8">
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-border hover:border-primary/50 hover:bg-muted/30'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                isDragging ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {isDragging ? 'Drop your file here' : 'Drag and drop your file'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse from your computer
                </p>
              </div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileInput}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="rounded-xl"
              >
                Browse Files
              </Button>
            </div>
          </div>

          {/* File Type Indicators */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
              <File className="w-4 h-4 text-destructive" />
              <span className="text-sm">PDF</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
              <File className="w-4 h-4 text-primary" />
              <span className="text-sm">Word</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">TXT</span>
            </div>
          </div>

          {/* Selected File Display */}
          {selectedFile && !isProcessing && (
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon()}
                  <div>
                    <p className="font-semibold">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFile(null)}
                  className="rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Processing your file...
                </p>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <Button
            size="lg"
            onClick={handleUpload}
            disabled={!selectedFile || isProcessing}
            className="w-full rounded-xl"
          >
            {isProcessing ? 'Processing...' : 'Upload and Summarize'}
          </Button>
        </Card>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Step 1</h4>
            <p className="text-sm text-muted-foreground">Upload your notes</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-accent-foreground" />
            </div>
            <h4 className="font-semibold mb-2">Step 2</h4>
            <p className="text-sm text-muted-foreground">Review AI summary</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Step 3</h4>
            <p className="text-sm text-muted-foreground">Take auto-quiz</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
