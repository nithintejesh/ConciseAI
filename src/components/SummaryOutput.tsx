import React from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

interface SummaryOutputProps {
  summary: string;
  loading: boolean;
}

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, loading }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="mt-8 p-6 bg-white/30 rounded-xl backdrop-blur-sm animate-pulse-slow">
        <div className="space-y-4">
          <div className="h-4 bg-white/50 rounded-full w-3/4 shimmer"></div>
          <div className="space-y-3">
            <div className="h-4 bg-white/50 rounded-full shimmer"></div>
            <div className="h-4 bg-white/50 rounded-full w-5/6 shimmer"></div>
            <div className="h-4 bg-white/50 rounded-full w-4/6 shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="mt-8 transform transition-all duration-500">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse-slow" />
          <h3 className="text-lg font-semibold text-gradient">Summary</h3>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5 text-gray-400 hover:text-indigo-600" />
          )}
        </button>
      </div>
      <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 card-shadow hover-scale">
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{summary}</p>
      </div>
    </div>
  );
};