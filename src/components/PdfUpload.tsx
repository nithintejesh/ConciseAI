import React, { useState } from 'react';
import { FileUp, Loader2, X } from 'lucide-react';
import { SummaryOutput } from './SummaryOutput';

export const PdfUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files?.[0]?.type === 'application/pdf') {
      setFile(files[0]);
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      if (files[0].type === 'application/pdf') {
        setFile(files[0]);
        setError('');
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', file);
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/text-processing/', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError('Failed to process PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <FileUp className="h-6 w-6 text-indigo-600 animate-float" />
        <h2 className="text-xl font-semibold text-gradient">PDF Summarizer</h2>
      </div>
      <form onSubmit={handleSubmit} onDragEnter={handleDrag}>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-indigo-500 bg-indigo-50/50 scale-105'
              : 'border-white/20 hover:border-indigo-400/50 bg-white/30'
          } ${error ? 'border-red-300' : ''}`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors duration-300 ${
              dragActive ? 'bg-indigo-100' : 'bg-indigo-50'
            }`}>
              <FileUp className={`h-8 w-8 transition-all duration-300 ${
                dragActive ? 'text-indigo-600 scale-110' : 'text-indigo-400'
              }`} />
            </div>
            <div>
              <span className="font-medium text-indigo-600">Click to upload</span>
              <span className="text-gray-600"> or drag and drop</span>
            </div>
            <p className="text-sm text-gray-500">PDF files only</p>
            {error && (
              <p className="text-sm text-red-500 animate-pulse">{error}</p>
            )}
          </div>
        </div>
        {file && (
          <div className="mt-4 flex items-center justify-between bg-white/30 p-4 rounded-xl backdrop-blur-sm hover-scale card-shadow">
            <span className="text-sm text-gray-600 truncate flex-1">{file.name}</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Summarize'
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      <SummaryOutput summary={summary} loading={loading} />
    </div>
  );
};