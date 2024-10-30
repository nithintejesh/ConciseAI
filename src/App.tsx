import React, { useState } from 'react';
import { TextInput } from './components/TextInput';
import { UrlInput } from './components/UrlInput';
import { PdfUpload } from './components/PdfUpload';
import { FileText, Link, FileUp, Linkedin, Github, Mail } from 'lucide-react';
import { XLogo } from './components/XLogo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'pdf'>('text');

  const tabs = [
    { id: 'text', label: 'Text', icon: FileText },
    { id: 'url', label: 'URL', icon: Link },
    { id: 'pdf', label: 'PDF', icon: FileUp },
  ] as const;

  const socialLinks = [
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/nithintejesh',
      label: 'LinkedIn'
    },
    { 
      icon: XLogo, 
      href: 'https://x.com/nithintejesh',
      label: 'X (Twitter)'
    },
    { 
      icon: Github, 
      href: 'https://github.com/nithintejesh',
      label: 'GitHub'
    },
    { 
      icon: Mail, 
      href: 'mailto:nithintejesh@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <div className="min-h-screen mesh-gradient flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-3xl flex-grow">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gradient">
            ConciseAI
          </h1>
          <p className="text-gray-600">
            From Boring to Brief in a Blink!
          </p>
        </header>

        <nav className="mb-8">
          <div className="flex justify-center space-x-2 p-1 glass-panel rounded-xl">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover-scale'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="glass-panel rounded-2xl p-6 mb-20">
          {activeTab === 'text' && <TextInput />}
          {activeTab === 'url' && <UrlInput />}
          {activeTab === 'pdf' && <PdfUpload />}
        </main>
      </div>

      <footer className="mt-auto py-3 glass-panel border-t border-white/20">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Nithin. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                aria-label={label}
              >
                <Icon className="h-5 w-5 hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;