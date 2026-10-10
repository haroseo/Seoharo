import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowUp, CornerDownLeft, Search, X } from 'lucide-react';
import { buildSiteSearchIndex, searchSiteContent } from '../data/siteSearch';
import { useLanguage } from './LanguageContext';
import { useRouter } from './router';

interface SiteSearchDialogProps {
  open: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

function optionId(id: string) {
  return `site-search-option-${id.replace(/[^a-z0-9_-]/gi, '-')}`;
}

export default function SiteSearchDialog({ open, onClose, onNavigate }: SiteSearchDialogProps) {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeOptionRef = useRef<HTMLButtonElement>(null);
  const entries = useMemo(() => buildSiteSearchIndex(), []);
  const results = useMemo(() => searchSiteContent(entries, query), [entries, query]);
  const activeEntry = results[activeIndex];
  const activeOptionId = activeEntry ? optionId(activeEntry.id) : undefined;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const root = document.getElementById('root');
    const previousInert = root?.inert ?? false;
    if (root) root.inert = true;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (root) root.inert = previousInert;
    };
  }, [open]);

  useEffect(() => {
    activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const selectResult = (entry: (typeof entries)[number]) => {
    navigate(entry.href);
    onNavigate();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    // Enter/Escape while composing Korean belong to the IME, not the dialog.
    if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === 'Tab') {
      const first = closeButtonRef.current;
      const last = inputRef.current;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }

    if (document.activeElement !== inputRef.current || results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index < 0 ? 0 : (index + 1) % results.length));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index < 0 ? results.length - 1 : (index - 1 + results.length) % results.length));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectResult(activeEntry ?? results[0]);
    }
  };

  if (!open) return null;

  // A backdrop-filter on the header otherwise traps fixed positioning there.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/45 px-3 pb-8 pt-[8vh] sm:px-6 sm:pt-[12vh]"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={dialogRef}
        id="site-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-search-title"
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-[#d6dce5] bg-white text-[var(--ink)] shadow-[0_24px_80px_rgba(10,22,40,0.24)]"
      >
        <header className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-4 py-3.5 sm:px-5">
          <h2 id="site-search-title" className="text-base font-bold">{t('사이트 검색', 'Search this site')}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t('검색 닫기', 'Close search')}
            className="inline-flex size-9 items-center justify-center rounded-md text-[var(--body-copy)] transition-colors hover:bg-[var(--serenity-pale)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="relative px-4 pb-3 pt-4 sm:px-5">
          <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-7 top-[1.95rem] text-[var(--muted-copy)]" />
          <label htmlFor="site-search-input" className="sr-only">{t('사이트 전체 검색어', 'Search the entire site')}</label>
          <input
            ref={inputRef}
            id="site-search-input"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls="site-search-results"
            aria-describedby="site-search-help site-search-status"
            aria-activedescendant={activeOptionId}
            maxLength={160}
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(-1);
            }}
            placeholder={t('프로젝트, 경력, 기술을 검색해보세요', 'Search projects, experience, or skills')}
            className="min-h-12 w-full rounded-lg border border-[#cbd2dc] bg-white py-3 pl-10 pr-4 text-sm text-[var(--ink)] placeholder:text-[var(--muted-copy)] focus:border-[var(--brand-accent)] focus:outline-2 focus:outline-[var(--brand-accent)] focus:outline-offset-1"
          />
          <p id="site-search-status" role="status" aria-live="polite" aria-atomic="true" className="mt-2 text-xs leading-5 text-[var(--muted-copy)]">
            {query.trim()
              ? t(`${results.length}개 결과`, `${results.length} results`)
              : t('소개, 경력, 프로젝트와 역량을 한 번에 찾습니다.', 'Find About, experience, projects, and skills in one place.')}
          </p>
          <p id="site-search-help" className="text-xs leading-5 text-[var(--muted-copy)]">
            {t('한·영 이름, 초성, 한/영 키 오입력으로도 찾을 수 있어요.', 'Search by Korean or English names, Korean initials, or the wrong keyboard layout.')}
          </p>
        </div>

        <ul id="site-search-results" role="listbox" aria-label={t('검색 결과', 'Search results')} className="max-h-[54vh] min-h-12 overflow-y-auto border-t border-[var(--line)] px-2 py-2 sm:px-3">
          {!query.trim() && (
            <li role="presentation" className="px-3 py-5 text-sm leading-6 text-[var(--muted-copy)]">
              {t('검색어를 입력하면 관련 내용을 보여드려요.', 'Type a keyword to see matching content.')}
            </li>
          )}
          {query.trim() && results.length === 0 && (
            <li role="presentation" className="px-3 py-5 text-sm leading-6 text-[var(--muted-copy)]">
              {t('검색 결과가 없습니다. 다른 단어로 다시 찾아보세요.', 'No results found. Try another keyword.')}
            </li>
          )}
          {query.trim() && results.map((entry, index) => {
            const active = index === activeIndex;
            return (
              <li key={entry.id} role="presentation">
                <button
                  id={optionId(entry.id)}
                  type="button"
                  role="option"
                  aria-selected={active}
                  tabIndex={-1}
                  ref={active ? activeOptionRef : undefined}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectResult(entry)}
                  className={`w-full rounded-lg px-3 py-3 text-left focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-[-2px] ${active ? 'bg-[var(--serenity-pale)]' : 'hover:bg-[#f5f7f9]'}`}
                >
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-sm font-semibold text-[var(--ink)]">{entry.title[language]}</span>
                    <span aria-hidden="true" className="text-xs text-[var(--muted-copy)]">·</span>
                    <span className="text-xs font-medium text-[var(--brand-accent)]">{entry.section[language]}</span>
                  </span>
                  <span className="mt-1 block line-clamp-2 text-xs leading-5 text-[var(--body-copy)]">{entry.excerpt[language]}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <footer className="flex items-center gap-4 border-t border-[var(--line)] px-4 py-2.5 text-[11px] text-[var(--muted-copy)] sm:px-5">
          <span className="inline-flex items-center gap-1"><ArrowUp size={12} aria-hidden="true" /><ArrowDown size={12} aria-hidden="true" /> {t('이동', 'Navigate')}</span>
          <span className="inline-flex items-center gap-1"><CornerDownLeft size={12} aria-hidden="true" /> {t('열기', 'Open')}</span>
          <span>Esc {t('닫기', 'close')}</span>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
