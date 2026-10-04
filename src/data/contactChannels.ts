import type { Copy } from './portfolioContent';

export const contactChannels: Array<{
  id: 'email' | 'github' | 'linkedin';
  label: Copy;
  href: string;
}> = [
  { id: 'email', label: { ko: 'Email', en: 'Email' }, href: 'mailto:seoharo0111@gmail.com' },
  { id: 'github', label: { ko: 'GitHub', en: 'GitHub' }, href: 'https://github.com/haroseo' },
  { id: 'linkedin', label: { ko: 'LinkedIn', en: 'LinkedIn' }, href: 'https://www.linkedin.com/in/seoharo/' },
];
