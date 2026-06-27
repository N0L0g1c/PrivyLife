import { Link, useLocation } from "react-router-dom";
import { useSavedTools, openExternal } from "@/hooks/useStorage";

const VASSDEV_URL = "https://vassbrekke.no/vassdev/";

const navItems = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/wizard", label: "Find My Stack", icon: "✨" },
  { path: "/browse", label: "Browse Tools", icon: "📚" },
  { path: "/my-stack", label: "My Stack", icon: "⭐" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { savedIds } = useSavedTools();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass sticky top-0 z-50 border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-emerald-500/30 pulse-glow">
              <img src={`${import.meta.env.BASE_URL}icon.png`} alt="PrivyLife" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight group-hover:text-emerald-400 transition-colors">
                PrivyLife
              </span>
              <span className="block text-[10px] sm:text-xs text-[var(--color-muted)]">
                Privacy Hub · by{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    openExternal(VASSDEV_URL);
                  }}
                  className="text-cyan-400/90 hover:text-cyan-300 transition-colors"
                >
                  VassDev
                </button>
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const active =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    active
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className="hidden sm:inline">{item.icon}</span>
                  {item.label}
                  {item.path === "/my-stack" && savedIds.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400">
                      {savedIds.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--color-border)] py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-[var(--color-muted)]">
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span>Made with</span>
            <span className="text-emerald-400" aria-hidden="true">🛡️</span>
            <span>by</span>
            <button
              type="button"
              onClick={() => openExternal(VASSDEV_URL)}
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              VassDev
            </button>
            <span className="text-slate-600">·</span>
            <span>Vassbrekke AS</span>
          </p>
          <p className="mt-3">
            PrivyLife curates open-source and privacy-respecting tools. We don't track you — preferences are stored locally only.
          </p>
          <p className="mt-2 text-xs">
            No analytics · No accounts · No cloud sync · Your data stays on your device
          </p>
        </div>
      </footer>
    </div>
  );
}
