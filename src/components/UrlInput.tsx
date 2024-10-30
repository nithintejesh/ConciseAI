import React, { useState } from 'react';
import { Clipboard, Loader2, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { SummaryOutput } from './SummaryOutput';

export const UrlInput: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setPasteSuccess(true);
      setTimeout(() => setPasteSuccess(false), 2000);
      setError('');
    } catch (err) {
      setError('Failed to read clipboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // const response = await fetch('http://your-api-endpoint/summarize-url', {
        const response = await fetch('http://localhost:8000/api/v1/text-processing/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError('Failed to fetch summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <LinkIcon className="h-6 w-6 text-indigo-600 animate-float" />
        <h2 className="text-xl font-semibold text-gradient">URL Summarizer</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1 group">
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder="Enter URL to summarize..."
              className={`w-full px-4 py-3 bg-white/50 border rounded-xl transition-all duration-300 placeholder-gray-400 ${
                error 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-white/20 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              required
            />
            <button
              type="button"
              onClick={handlePaste}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                pasteSuccess 
                  ? 'text-green-500' 
                  : 'text-gray-400 hover:text-indigo-600'
              }`}
              title="Paste from clipboard"
            >
              <Clipboard className={`h-5 w-5 transition-transform duration-200 ${
                pasteSuccess ? 'scale-110' : ''
              }`} />
            </button>
          </div>
          <button
            type="submit"
            disabled={loading || !url}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover-scale"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Summarize'
            )}
          </button>
        </div>
        {error && (
          <div className="flex items-center space-x-2 text-red-500 text-sm animate-pulse">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </form>

      <SummaryOutput summary={summary} loading={loading} />
    </div>
  );
};