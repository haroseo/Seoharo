import type { MouseEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getReturnDestination } from '../data/portfolioRoutes';
import { useLanguage } from './LanguageContext';
import { useRouter } from './router';

export default function ReturnNavigation({ className = '' }: { className?: string }) {
  const { currentPath, previousHref, returnTo } = useRouter();
  const { language } = useLanguage();
  const destination = getReturnDestination(currentPath, previousHref, language);
  if (!destination) return null;
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    returnTo(destination.href);
  };
  return (
    <a href={destination.href} data-return-navigation="true" onClick={handleClick}
      className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--body-copy)] transition-colors hover:text-[var(--brand-accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-4 ${className}`}>
      <ArrowLeft size={16} className="shrink-0" aria-hidden="true" />
      <span>{destination.label}</span>
    </a>
  );
}
