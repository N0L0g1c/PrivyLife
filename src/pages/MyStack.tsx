import { Link } from "react-router-dom";
import { getToolById } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { useChecklist, useSavedTools } from "@/hooks/useStorage";

export default function MyStack() {
  const { savedIds, toggleSave } = useSavedTools();
  const { isChecked, toggle, progress } = useChecklist();

  const tools = savedIds
    .map((id) => getToolById(id))
    .filter((t): t is NonNullable<typeof t> => !!t);

  if (tools.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">⭐</div>
        <h1 className="text-2xl font-bold mb-3">Your stack is empty</h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Save tools from browse or use the Privacy Wizard to build your personalized stack.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/wizard"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold transition-colors"
          >
            ✨ Find My Stack
          </Link>
          <Link
            to="/browse"
            className="px-6 py-3 rounded-xl border border-[var(--color-border)] text-slate-300 hover:text-emerald-400 transition-colors"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Privacy Stack</h1>
          <p className="text-slate-400">
            {tools.length} saved tool{tools.length !== 1 ? "s" : ""} · stored locally on your device
          </p>
        </div>
        {tools.length > 0 && (
          <div className="glass rounded-xl px-5 py-3">
            <div className="text-sm text-slate-400 mb-1">Setup progress</div>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${(progress / tools.length) * 100}%` }}
                />
              </div>
              <span className="text-emerald-400 font-semibold text-sm">
                {progress}/{tools.length}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {tools.map((tool) => (
          <div key={tool.id} className="flex gap-3 items-start">
            <button
              onClick={() => toggle(tool.id)}
              className={`mt-5 shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-sm transition-colors ${
                isChecked(tool.id)
                  ? "bg-emerald-500 border-emerald-500 text-slate-900"
                  : "border-slate-600 hover:border-emerald-500"
              }`}
              title="Mark as installed"
              aria-label={`Mark ${tool.name} as installed`}
            >
              {isChecked(tool.id) ? "✓" : ""}
            </button>
            <div className="flex-1 relative">
              <ToolCard tool={tool} />
              <button
                onClick={() => toggleSave(tool.id)}
                className="absolute top-5 right-14 text-xs text-slate-500 hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
