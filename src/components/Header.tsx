import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from './router';
import { motion } from 'framer-motion';

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
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-5xl bg-black/75 backdrop-blur-2xl border border-zinc-900 rounded-full px-8 py-3.5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <img 
            src="/assets/seoharo-logo-round.png" 
            alt="SEOHARO" 
            className="w-8 h-8 object-cover rounded-full border border-zinc-800 bg-black" 
          />
          <div className="flex flex-col">
            <button
              onClick={() => navigate('/about')}
              className="text-left text-sm font-bold tracking-[0.25em] uppercase text-white hover:text-zinc-200 transition-colors cursor-pointer"
            >
              SEOHARO
            </button>
            <p className="text-[7.5px] uppercase tracking-[0.25em] text-zinc-500 font-mono">
              Designer & Dev
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className={`relative px-4.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] font-mono cursor-pointer transition-colors ${
                isLinkActive(item.path)
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {isLinkActive(item.path) && (
                <motion.div
                  layoutId="active-nav-capsule"
                  className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-4 right-4 bg-black/95 backdrop-blur-2xl border border-zinc-900 rounded-3xl p-5 flex flex-col gap-3 shadow-[0_30px_60px_rgba(0,0,0,0.9)] pointer-events-auto md:hidden">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-bold font-mono tracking-[0.2em] uppercase cursor-pointer transition-colors ${
                isLinkActive(item.path)
                  ? 'bg-zinc-900 text-white border border-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
