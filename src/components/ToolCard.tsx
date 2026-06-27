import { Link } from "react-router-dom";
import type { PrivacyTool } from "@/data/tools";
import { openExternal, useSavedTools } from "@/hooks/useStorage";

interface ToolCardProps {
  tool: PrivacyTool;
  reason?: string;
  showCategory?: boolean;
}

export default function ToolCard({ tool, reason, showCategory }: ToolCardProps) {
  const { isSaved, toggleSave } = useSavedTools();

  return (
    <article className="glass rounded-2xl p-5 card-hover flex flex-col h-full animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Link
              to={`/tool/${tool.id}`}
              className="font-semibold text-lg text-slate-100 hover:text-emerald-400 transition-colors truncate"
            >
              {tool.name}
            </Link>
            {tool.recommended && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                Recommended
              </span>
            )}
            {tool.comingSoon && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                Coming Soon
              </span>
            )}
            {tool.tags.includes("vassdev") && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                VassDev
              </span>
            )}
          </div>
          <p className="text-sm text-emerald-400/80">{tool.tagline}</p>
        </div>
        <button
          onClick={() => toggleSave(tool.id)}
          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            isSaved(tool.id)
              ? "bg-amber-500/15 text-amber-400"
              : "bg-white/5 text-slate-500 hover:text-amber-400 hover:bg-amber-500/10"
          }`}
          title={isSaved(tool.id) ? "Remove from My Stack" : "Save to My Stack"}
          aria-label={isSaved(tool.id) ? "Remove from My Stack" : "Save to My Stack"}
        >
          {isSaved(tool.id) ? "★" : "☆"}
        </button>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4 line-clamp-3">
        {reason ?? tool.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.openSource && (
          <Badge label="Open Source" color="emerald" />
        )}
        {tool.freeTier && <Badge label="Free" color="sky" />}
        {tool.platforms.includes("windows") && <Badge label="Windows" color="slate" />}
        {tool.platforms.includes("linux") && <Badge label="Linux" color="slate" />}
        {showCategory && (
          <Badge label={tool.category} color="violet" />
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => openExternal(tool.links.website)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm transition-colors"
        >
          {tool.comingSoon ? "Learn More →" : tool.tags.includes("vassdev") ? "VassDev →" : "Visit Website →"}
        </button>
        <Link
          to={`/tool/${tool.id}`}
          className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 text-sm transition-colors"
        >
          Details
        </Link>
      </div>
    </article>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    sky: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    slate: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };
  return (
    <span className={`px-2 py-0.5 text-xs rounded-md border ${colors[color] ?? colors.slate}`}>
      {label}
    </span>
  );
}
