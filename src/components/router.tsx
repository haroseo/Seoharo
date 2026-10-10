import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { getNavigationAnchor, resolveRedirectPath } from '../data/portfolioRoutes';
import { normalizeAppPath } from '../data/siteUrl';
import { createNavigationEntry, readNavigationEntry, type NavigationEntry, type NavigationView } from '../lib/navigationHistory';

const currentHref = () => `${window.location.pathname}${window.location.search}${window.location.hash}`;
function persistEntry(entry: NavigationEntry) {
  const existing = window.history.state;
  window.history.replaceState({ ...(existing && typeof existing === 'object' ? existing : {}), seoharoNavigation: entry }, '', entry.href);
}

interface RouterContextType {
  currentPath: string;
  navigate: (to: string, options?: { preserveScroll?: boolean; replace?: boolean }) => void;
  previousHref: string | null;
  returnTo: (href: string) => void;
  viewState: NavigationView;
  updateViewState: (patch: NavigationView) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function RouterProvider({ children, initialPath = '/' }: { children: React.ReactNode; initialPath?: string }) {
  const [currentPath, setCurrentPath] = useState(normalizeAppPath(initialPath) ?? '/404');
  const currentPathRef = useRef(currentPath);
  const entryRef = useRef<NavigationEntry | null>(null);
  const [entryState, setEntryState] = useState<NavigationEntry | null>(null);
  const navigationIntentRef = useRef<{
    nextPath: string;
    previousPath: string;
    hash: string;
    previousScrollY: number;
    preserveScroll: boolean;
    restoreScrollY?: number;
  } | null>(null);
  const [navigationVersion, setNavigationVersion] = useState(0);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const handlePopState = (event?: PopStateEvent) => {
      const previousPath = currentPathRef.current;
      const url = new URL(window.location.href);
      const stored = readNavigationEntry(window.history.state, currentHref());
      const entry = stored ?? createNavigationEntry(currentHref());
      entryRef.current = entry;
      persistEntry(entry);
      setEntryState(entry);
      navigationIntentRef.current = {
        nextPath: normalizeAppPath(url.pathname) ?? '/404',
        previousPath,
        hash: url.hash,
        previousScrollY: window.scrollY,
        preserveScroll: false,
        restoreScrollY: stored && (event || stored.scrollY > 0) ? stored.scrollY : undefined,
      };
      currentPathRef.current = normalizeAppPath(url.pathname) ?? '/404';
      setCurrentPath(currentPathRef.current);
      setNavigationVersion((version) => version + 1);
    };

    const redirectedPath = resolveRedirectPath(new URLSearchParams(window.location.search).get('p'), window.location.origin);
    if (redirectedPath) window.history.replaceState({}, '', redirectedPath);
    const frame = requestAnimationFrame(() => handlePopState());
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    const saveScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (!entryRef.current || navigationIntentRef.current || entryRef.current.href !== currentHref()) return;
        entryRef.current = { ...entryRef.current, scrollY: window.scrollY };
        persistEntry(entryRef.current);
      }, 150);
    };
    window.addEventListener('scroll', saveScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    return () => {
      cancelAnimationFrame(frame); clearTimeout(scrollTimer);
      window.removeEventListener('scroll', saveScroll); window.removeEventListener('popstate', handlePopState);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    const intent = navigationIntentRef.current;
    if (!intent) return;
    let attempts = 0;
    let frameId = 0;

    const applyNavigation = () => {
      const renderedPath = document.querySelector('[data-page-path]')?.getAttribute('data-page-path');
      if (renderedPath !== intent.nextPath && attempts++ < 40) {
        frameId = requestAnimationFrame(applyNavigation); return;
      }
      if (intent.restoreScrollY !== undefined) {
        window.scrollTo({ top: intent.restoreScrollY, behavior: 'instant' });
        if (Math.abs(window.scrollY - intent.restoreScrollY) > 1 && attempts++ < 40) {
          frameId = requestAnimationFrame(applyNavigation); return;
        }
        document.getElementById('main-content')?.focus({ preventScroll: true });
        navigationIntentRef.current = null;
        return;
      }
      if (intent.preserveScroll) {
        window.scrollTo({ top: intent.previousScrollY, behavior: 'instant' });
        navigationIntentRef.current = null;
        return;
      }

      const anchorId = getNavigationAnchor(intent.hash);

      const anchor = anchorId ? document.getElementById(anchorId) : null;
      if (anchor) {
        // A search hit inside a closed introduction must be readable on arrival.
        let disclosure = anchor.closest('details');
        while (disclosure) {
          disclosure.open = true;
          disclosure = disclosure.parentElement?.closest('details') ?? null;
        }
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

  const updateViewState = useCallback((patch: NavigationView) => {
    const entry = entryRef.current;
    if (!entry) return;
    const next = readNavigationEntry({ seoharoNavigation: { ...entry, view: { ...entry.view, ...patch } } }, currentHref());
    if (!next) return;
    entryRef.current = next;
    persistEntry(next);
    setEntryState(next);
  }, []);

  const navigate = (to: string, options: { preserveScroll?: boolean; replace?: boolean } = {}) => {
    const url = new URL(to, window.location.origin);
    if (url.origin !== window.location.origin) return;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (currentUrl === nextUrl) {
      if (!url.hash) {
        // Search may close its dialog even when the destination is already open.
        // Wait for the dialog's inert cleanup, without moving the reading position.
        if (!options.preserveScroll) requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }));
        return;
      }
      if (url.hash.startsWith('#contribution-company-work-')) updateViewState({ companySpecialty: 'all' });
      navigationIntentRef.current = {
        nextPath: currentPathRef.current, previousPath: currentPathRef.current,
        hash: url.hash, previousScrollY: window.scrollY, preserveScroll: false,
      };
      setNavigationVersion((version) => version + 1);
      return;
    }

    const previousPath = window.location.pathname;
    const previousScrollY = window.scrollY;
    const currentEntry = entryRef.current ?? createNavigationEntry(currentUrl);
    const savedEntry = { ...currentEntry, href: currentUrl, scrollY: previousScrollY };
    persistEntry(savedEntry);
    const nextEntry = createNavigationEntry(nextUrl, savedEntry, options.replace);
    navigationIntentRef.current = {
      nextPath: normalizeAppPath(url.pathname) ?? '/404',
      previousPath,
      hash: url.hash,
      previousScrollY,
      preserveScroll: options.preserveScroll ?? false,
    };
    if (options.replace) persistEntry(nextEntry);
    else window.history.pushState({ seoharoNavigation: nextEntry }, '', nextUrl);
    entryRef.current = nextEntry;
    setEntryState(nextEntry);
    currentPathRef.current = normalizeAppPath(url.pathname) ?? '/404';
    setCurrentPath(currentPathRef.current);
    setNavigationVersion((version) => version + 1);
  };

  const returnTo = (href: string) => {
    const entry = entryRef.current;
    if (entry?.previous?.href === href && entry.previous.index < entry.index) {
      window.history.go(entry.previous.index - entry.index);
    } else navigate(href, { replace: true });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, previousHref: entryState?.previous?.href ?? null, returnTo, viewState: entryState?.view ?? {}, updateViewState }}>
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
