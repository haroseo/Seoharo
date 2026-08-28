import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <SearchContext.Provider value={{ query, setQuery, activeTag, setActiveTag }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
}
