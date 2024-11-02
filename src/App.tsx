import React, { useState, useEffect } from 'react';
import { TextInput } from './components/TextInput';
import { UrlInput } from './components/UrlInput';
import { PdfUpload } from './components/PdfUpload';
import { FileText, Link, FileUp, Linkedin, Github, Mail } from 'lucide-react';
import { XLogo } from './components/XLogo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'pdf'>('text');
  const [showFooter, setShowFooter] = useState(false);

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

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen mesh-gradient flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-3xl">
        <header className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
            ConciseAI
          </h1>
          <p className="text-gray-600">
            From Boring to Brief in a Blink!
          </p>
        </header>

        <nav className="mb-6 md:mb-8">
          <div className="flex justify-center space-x-2 p-1 glass-panel rounded-xl">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="glass-panel rounded-2xl p-4 md:p-6">
          {activeTab === 'text' && <TextInput />}
          {activeTab === 'url' && <UrlInput />}
          {activeTab === 'pdf' && <PdfUpload />}
        </main>
      </div>

      <footer className={`mt-auto w-full py-4 glass-panel border-t border-white/20 transition-transform duration-300 ${showFooter ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <p className="text-sm text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} Nithin. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
