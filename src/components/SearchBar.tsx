import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, searchTools } from "@/data/tools";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
      <input
        type="search"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder ?? "Search tools, tags, categories..."}
        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
      />
      {query && (
        <button
          onClick={() => handleChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/browse/${cat.id}`}
          className="glass rounded-xl p-4 card-hover text-center group"
        >
          <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">
            {cat.icon}
          </span>
          <span className="text-sm font-medium text-slate-300 group-hover:text-emerald-400 transition-colors">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function QuickSearch() {
  const [results, setResults] = useState<ReturnType<typeof searchTools>>([]);
  const [active, setActive] = useState(false);

  return (
    <div className="relative">
      <SearchBar
        onSearch={(q) => {
          setResults(searchTools(q));
          setActive(q.length > 0);
        }}
      />
      {active && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl overflow-hidden z-40 max-h-80 overflow-y-auto">
          {results.slice(0, 8).map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.id}`}
              onClick={() => setActive(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 border-b border-[var(--color-border)] last:border-0"
            >
              <span className="font-medium text-slate-200">{tool.name}</span>
              <span className="text-xs text-slate-500 ml-auto">{tool.category}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
