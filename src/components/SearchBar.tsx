interface Props {
  query: string;
  setQuery: (q: string) => void;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  allTags: string[];
}

export default function SearchBar({ query, setQuery, activeTag, setActiveTag, allTags }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex-1">
        <label className="sr-only">Search projects</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="프로젝트 검색 (제목·설명·태그)"
          className="w-full bg-white/5 border border-white/8 placeholder:text-zinc-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/10"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
            activeTag ? 'bg-white/5 text-zinc-300' : 'bg-white text-black'
          }`}
        >
          전체
        </button>

        {allTags.slice(0, 40).map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
              activeTag === tag ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
