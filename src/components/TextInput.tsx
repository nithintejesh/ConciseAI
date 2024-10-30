import React, { useState } from 'react';
import { Loader2, Type, AlertCircle } from 'lucide-react';
import { SummaryOutput } from './SummaryOutput';

export const TextInput: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://conciseai.up.railway.app/api/v1/text-processing/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <Type className="h-6 w-6 text-indigo-600 animate-float" />
        <h2 className="text-xl font-semibold text-gradient">Text Summarizer</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Enter or paste text to summarize..."
            className={`w-full h-48 px-4 py-3 bg-white/50 border rounded-xl transition-all duration-300 placeholder-gray-400 resize-none ${
              error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-white/20 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
            required
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-500">
            {charCount} characters
          </div>
        </div>
        {error && (
          <div className="flex items-center space-x-2 text-red-500 text-sm animate-pulse">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !text}
          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover-scale"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Summarize'
          )}
        </button>
      </form>

      <SummaryOutput summary={summary} loading={loading} />
    </div>
  );
};