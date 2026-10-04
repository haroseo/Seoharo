import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
export function Github({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M9 19c-4 1-4-2-6-2m12 5v-4a4 4 0 0 0-1-3c3 0 6-2 6-5a5 5 0 0 0-1-3c.3-1 .3-2 0-3 0 0-1 0-3 1a13 13 0 0 0-8 0C6 4 5 4 5 4c-.3 1-.3 2 0 3a5 5 0 0 0-1 3c0 3 3 5 6 5a4 4 0 0 0-1 3v4" /></svg>;
}
export function Linkedin({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4" /><circle cx="7" cy="7" r=".6" fill="currentColor" /></svg>;
}
