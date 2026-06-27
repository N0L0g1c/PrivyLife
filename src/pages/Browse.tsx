import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  categories,
  getCategoryInfo,
  getToolsByCategory,
  privacyTools,
  searchTools,
  type Platform,
  type ToolCategory,
} from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";

export default function Browse() {
  const { category } = useParams<{ category?: string }>();
  const [query, setQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [showRecommendedOnly, setShowRecommendedOnly] = useState(false);

  const activeCategory = category as ToolCategory | undefined;
  const categoryInfo = activeCategory ? getCategoryInfo(activeCategory) : undefined;

  const tools = useMemo(() => {
    let result = activeCategory ? getToolsByCategory(activeCategory) : privacyTools;
    if (query) result = searchTools(query).filter((t) => !activeCategory || t.category === activeCategory);
    if (platformFilter !== "all") result = result.filter((t) => t.platforms.includes(platformFilter));
    if (showRecommendedOnly) result = result.filter((t) => t.recommended);
    return result;
  }, [activeCategory, query, platformFilter, showRecommendedOnly]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryInfo ? `${categoryInfo.icon} ${categoryInfo.name}` : "Browse All Tools"}
        </h1>
        {categoryInfo ? (
          <div className="space-y-2">
            <p className="text-slate-400">{categoryInfo.description}</p>
            <p className="text-sm text-emerald-400/70 italic">{categoryInfo.whyItMatters}</p>
          </div>
        ) : (
          <p className="text-slate-400">
            Explore {privacyTools.length} privacy tools across {categories.length} categories.
          </p>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          to="/browse"
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-white/5 text-slate-400 hover:text-slate-200"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/browse/${cat.id}`}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-white/5 text-slate-400 hover:text-slate-200"
            }`}
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar onSearch={setQuery} />
        </div>
        <div className="flex gap-2 shrink-0">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as Platform | "all")}
            className="px-4 py-3 rounded-xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-slate-300 text-sm focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All platforms</option>
            <option value="windows">Windows</option>
            <option value="linux">Linux</option>
          </select>
          <button
            onClick={() => setShowRecommendedOnly(!showRecommendedOnly)}
            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
              showRecommendedOnly
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                : "border-[var(--color-border)] text-slate-400 hover:text-slate-200"
            }`}
          >
            ★ Recommended
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-5">{tools.length} tool{tools.length !== 1 ? "s" : ""} found</p>

      {tools.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-slate-400">No tools match your filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} showCategory={!activeCategory} />
          ))}
        </div>
      )}
    </div>
  );
}
