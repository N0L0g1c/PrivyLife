import { Link } from "react-router-dom";
import { categories, getRecommendedTools, privacyTools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { CategoryGrid, QuickSearch } from "@/components/SearchBar";

export default function Home() {
  const recommended = getRecommendedTools().slice(0, 6);

  return (
    <div className="hero-glow">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-emerald-400 mb-6">
          <span>🛡️</span>
          <span>Windows & Linux · 100% local · No tracking</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Your privacy stack,
          <br />
          <span className="gradient-text">all in one place</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          PrivyLife helps you discover, compare, and link to the best privacy tools.
          Get personalized recommendations and direct download links — no guesswork.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/wizard"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-slate-900 font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
          >
            ✨ Find My Privacy Stack
          </Link>
          <Link
            to="/browse"
            className="px-8 py-4 rounded-2xl glass text-slate-200 font-semibold text-lg hover:border-emerald-500/40 transition-colors"
          >
            Browse {privacyTools.length} Tools
          </Link>
        </div>

        <div className="max-w-xl mx-auto">
          <QuickSearch />
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: privacyTools.length, label: "Curated Tools" },
            { value: categories.length, label: "Categories" },
            { value: privacyTools.filter((t) => t.openSource).length, label: "Open Source" },
            { value: privacyTools.filter((t) => t.freeTier).length, label: "Free Options" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
        <p className="text-slate-400 mb-6">Every area of your digital life, covered.</p>
        <CategoryGrid />
      </section>

      {/* Recommended */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Top Picks</h2>
            <p className="text-slate-400 mt-1">Editor's choice for maximum privacy impact</p>
          </div>
          <Link to="/browse" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommended.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="glass rounded-3xl p-8 sm:p-12 text-center border-emerald-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Not sure where to start?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Answer 4 quick questions and get a personalized privacy stack with direct links to every tool you need.
          </p>
          <Link
            to="/wizard"
            className="inline-flex px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold transition-colors"
          >
            Start the Privacy Wizard →
          </Link>
        </div>
      </section>
    </div>
  );
}
