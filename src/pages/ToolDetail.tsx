import { Link, useParams } from "react-router-dom";
import { getCategoryInfo, getToolById } from "@/data/tools";
import { openExternal, useSavedTools } from "@/hooks/useStorage";

export default function ToolDetail() {
  const { id } = useParams<{ id: string }>();
  const tool = id ? getToolById(id) : undefined;
  const { isSaved, toggleSave } = useSavedTools();

  if (!tool) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
        <Link to="/browse" className="text-emerald-400 hover:text-emerald-300">
          ← Back to browse
        </Link>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(tool.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to={`/browse/${tool.category}`} className="text-sm text-slate-500 hover:text-emerald-400 mb-6 inline-block">
        ← {categoryInfo?.icon} {categoryInfo?.name}
      </Link>

      <div className="glass rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[var(--color-border)] bg-gradient-to-br from-emerald-500/5 to-violet-500/5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                {tool.recommended && (
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    ★ Recommended
                  </span>
                )}
              </div>
              <p className="text-lg text-emerald-400/90">{tool.tagline}</p>
            </div>
            <button
              onClick={() => toggleSave(tool.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isSaved(tool.id)
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                  : "bg-white/5 text-slate-400 border border-[var(--color-border)] hover:text-amber-400"
              }`}
            >
              {isSaved(tool.id) ? "★ Saved" : "☆ Save to Stack"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {tool.openSource && <Tag label="Open Source" />}
            {tool.freeTier && <Tag label="Free Tier" />}
            {!tool.freeTier && <Tag label="Paid" />}
            <Tag label={tool.privacyLevel} />
            {tool.platforms.map((p) => (
              <Tag key={p} label={p} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-slate-400 leading-relaxed">{tool.description}</p>
          </section>

          <div className="grid sm:grid-cols-2 gap-6">
            <section>
              <h2 className="text-lg font-semibold mb-3 text-emerald-400">Pros</h2>
              <ul className="space-y-2">
                {tool.pros.map((pro) => (
                  <li key={pro} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-emerald-400 shrink-0">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3 text-amber-400">Cons</h2>
              <ul className="space-y-2">
                {tool.cons.map((con) => (
                  <li key={con} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-amber-400 shrink-0">−</span>
                    {con}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Links */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Direct Links</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <LinkButton
                label="Official Website"
                url={tool.links.website}
                primary
              />
              {tool.links.download?.map((dl) => (
                <LinkButton key={dl.url} label={`Download — ${dl.label}`} url={dl.url} />
              ))}
              {tool.links.docs && (
                <LinkButton label="Documentation" url={tool.links.docs} />
              )}
              {tool.links.github && (
                <LinkButton label="GitHub" url={tool.links.github} />
              )}
            </div>
          </section>

          {tool.tags.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-lg bg-white/5 text-slate-400 border border-[var(--color-border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-slate-400 border border-[var(--color-border)] capitalize">
      {label}
    </span>
  );
}

function LinkButton({ label, url, primary }: { label: string; url: string; primary?: boolean }) {
  return (
    <button
      onClick={() => openExternal(url)}
      className={`px-5 py-3.5 rounded-xl text-sm font-semibold text-left transition-colors ${
        primary
          ? "bg-emerald-500 hover:bg-emerald-400 text-slate-900"
          : "bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400"
      }`}
    >
      {label} →
    </button>
  );
}
