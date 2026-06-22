import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from './router';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPath, navigate } = useRouter();

  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Chat', path: '/chat' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isLinkActive = (path: string) => {
    if (path === '/about') {
      return currentPath === '/' || currentPath === '/about';
    }
    return currentPath === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/seoharo-logo-round.png" alt="SEOHARO Logo" className="w-12 h-12 object-cover rounded-full border border-slate-100 shadow-sm bg-white" />
            <div className="flex flex-col gap-1">
              <button
                onClick={() => navigate('/about')}
                className="text-left text-lg font-semibold tracking-[0.28em] uppercase text-slate-900 transition-colors cursor-pointer"
              >
                SEOHARO
              </button>
              <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-medium">
                Brand Designer, Marketer, & CEO
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm tracking-[0.18em] uppercase cursor-pointer transition-colors ${
                  isLinkActive(item.path)
                    ? 'text-slate-950 font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center justify-between md:justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-slate-200 pt-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left py-2 text-sm tracking-[0.16em] uppercase cursor-pointer transition-colors ${
                  isLinkActive(item.path)
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
