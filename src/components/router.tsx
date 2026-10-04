import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { resolveRedirectPath } from '../data/portfolioRoutes';
import { normalizeAppPath } from '../data/siteUrl';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string, options?: { preserveScroll?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function RouterProvider({ children, initialPath = '/' }: { children: React.ReactNode; initialPath?: string }) {
  const [currentPath, setCurrentPath] = useState(normalizeAppPath(initialPath) ?? '/404');
  const currentPathRef = useRef(currentPath);
  const navigationIntentRef = useRef<{
    nextPath: string;
    previousPath: string;
    hash: string;
    previousScrollY: number;
    preserveScroll: boolean;
  } | null>(null);
  const [navigationVersion, setNavigationVersion] = useState(0);

  useEffect(() => {
    const handlePopState = () => {
      const previousPath = currentPathRef.current;
      const url = new URL(window.location.href);
      navigationIntentRef.current = {
        nextPath: normalizeAppPath(url.pathname) ?? '/404',
        previousPath,
        hash: url.hash,
        previousScrollY: window.scrollY,
        preserveScroll: false,
      };
      currentPathRef.current = normalizeAppPath(url.pathname) ?? '/404';
      setCurrentPath(currentPathRef.current);
      setNavigationVersion((version) => version + 1);
    };

    const redirectedPath = resolveRedirectPath(new URLSearchParams(window.location.search).get('p'), window.location.origin);
    if (redirectedPath) window.history.replaceState({}, '', redirectedPath);
    const frame = requestAnimationFrame(handlePopState);
    window.addEventListener('popstate', handlePopState);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('popstate', handlePopState); };
  }, []);

  useEffect(() => {
    const intent = navigationIntentRef.current;
    if (!intent) return;
    let attempts = 0;
    let frameId = 0;

    const applyNavigation = () => {
      if (intent.preserveScroll) {
        window.scrollTo({ top: intent.previousScrollY, behavior: 'instant' });
        navigationIntentRef.current = null;
        return;
      }

      let anchorId = intent.nextPath === '/career' ? 'experience' : '';
      try {
        anchorId = decodeURIComponent(intent.hash.slice(1)) || anchorId;
      } catch {
        anchorId = intent.nextPath === '/career' ? 'experience' : '';
      }

      const anchor = anchorId ? document.getElementById(anchorId) : null;
      if (anchor) {
        anchor.scrollIntoView({ block: 'start', behavior: 'instant' });
        anchor.focus({ preventScroll: true });
        navigationIntentRef.current = null;
        return;
      }

      if (!anchorId) {
        if (intent.nextPath !== intent.previousPath) {
          window.scrollTo({ top: 0, behavior: 'instant' });
          document.getElementById('main-content')?.focus({ preventScroll: true });
        }
        navigationIntentRef.current = null;
        return;
      }

      attempts += 1;
      if (attempts < 40) {
        frameId = requestAnimationFrame(applyNavigation);
        return;
      }

      navigationIntentRef.current = null;
    };

    frameId = requestAnimationFrame(applyNavigation);
    return () => cancelAnimationFrame(frameId);
  }, [currentPath, navigationVersion]);

  const navigate = (to: string, options: { preserveScroll?: boolean } = {}) => {
    const url = new URL(to, window.location.origin);
    if (url.origin !== window.location.origin) return;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (currentUrl === nextUrl) return;

    const previousPath = window.location.pathname;
    const previousScrollY = window.scrollY;
    navigationIntentRef.current = {
      nextPath: normalizeAppPath(url.pathname) ?? '/404',
      previousPath,
      hash: url.hash,
      previousScrollY,
      preserveScroll: options.preserveScroll ?? false,
    };
    window.history.pushState({}, '', nextUrl);
    currentPathRef.current = normalizeAppPath(url.pathname) ?? '/404';
    setCurrentPath(currentPathRef.current);
    setNavigationVersion((version) => version + 1);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export function Link({ to, children, onClick, ...props }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || props.download !== undefined || (props.target && props.target !== '_self')) return;
    const url = new URL(to, window.location.origin);
    if (url.origin !== window.location.origin) return;
    e.preventDefault();
    navigate(`${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
