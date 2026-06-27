import { useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryInfo, getToolById } from "@/data/tools";
import {
  getWizardRecommendations,
  wizardQuestions,
  type WizardAnswers,
} from "@/data/wizard";
import ToolCard from "@/components/ToolCard";
import { useChecklist, useSavedTools } from "@/hooks/useStorage";

type Step = "platform" | "experience" | "priorities" | "budget" | "results";

const steps: Step[] = ["platform", "experience", "priorities", "budget", "results"];

export default function Wizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({
    priorities: [],
  });
  const { toggle, isChecked, progress } = useChecklist();
  const { toggleSave, isSaved } = useSavedTools();

  const step = steps[stepIndex];
  const isResults = step === "results";

  const recommendations = isResults
    ? getWizardRecommendations(answers as WizardAnswers)
    : [];

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  const canProceed = (): boolean => {
    switch (step) {
      case "platform":
        return !!answers.platform;
      case "experience":
        return !!answers.experience;
      case "priorities":
        return (answers.priorities?.length ?? 0) > 0;
      case "budget":
        return !!answers.budget;
      default:
        return true;
    }
  };

  const togglePriority = (value: string) => {
    setAnswers((prev) => {
      const current = prev.priorities ?? [];
      return {
        ...prev,
        priorities: current.includes(value)
          ? current.filter((p) => p !== value)
          : [...current, value],
      };
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Privacy Stack Wizard</h1>
        <p className="text-slate-400">
          Answer a few questions to get your personalized privacy toolkit.
        </p>
      </div>

      {/* Progress bar */}
      {!isResults && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Step {stepIndex + 1} of {steps.length - 1}</span>
            <span>{Math.round((stepIndex / (steps.length - 2)) * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--color-surface-overlay)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${(stepIndex / (steps.length - 2)) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="glass rounded-3xl p-6 sm:p-8 min-h-[400px] flex flex-col">
        {step === "platform" && (
          <QuestionBlock question={wizardQuestions.platform.question}>
            <div className="grid sm:grid-cols-2 gap-4">
              {wizardQuestions.platform.options.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={answers.platform === opt.value}
                  onClick={() => setAnswers((p) => ({ ...p, platform: opt.value }))}
                  icon={opt.icon}
                  label={opt.label}
                />
              ))}
            </div>
          </QuestionBlock>
        )}

        {step === "experience" && (
          <QuestionBlock question={wizardQuestions.experience.question}>
            <div className="space-y-3">
              {wizardQuestions.experience.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers((p) => ({ ...p, experience: opt.value }))}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    answers.experience === opt.value
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-[var(--color-border)] hover:border-emerald-500/30"
                  }`}
                >
                  <div className="font-semibold text-slate-200">{opt.label}</div>
                  <div className="text-sm text-slate-500 mt-1">{opt.description}</div>
                </button>
              ))}
            </div>
          </QuestionBlock>
        )}

        {step === "priorities" && (
          <QuestionBlock question={wizardQuestions.priorities.question}>
            <div className="grid sm:grid-cols-2 gap-3">
              {wizardQuestions.priorities.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => togglePriority(opt.value)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    answers.priorities?.includes(opt.value)
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-[var(--color-border)] hover:border-emerald-500/30"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="font-medium text-slate-200">{opt.label}</span>
                  {answers.priorities?.includes(opt.value) && (
                    <span className="ml-auto text-emerald-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </QuestionBlock>
        )}

        {step === "budget" && (
          <QuestionBlock question={wizardQuestions.budget.question}>
            <div className="space-y-3">
              {wizardQuestions.budget.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers((p) => ({ ...p, budget: opt.value }))}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    answers.budget === opt.value
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-[var(--color-border)] hover:border-emerald-500/30"
                  }`}
                >
                  <div className="font-semibold text-slate-200">{opt.label}</div>
                  <div className="text-sm text-slate-500 mt-1">{opt.description}</div>
                </button>
              ))}
            </div>
          </QuestionBlock>
        )}

        {step === "results" && (
          <div className="flex-1">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Your Privacy Stack</h2>
              <p className="text-slate-400">
                {recommendations.length} tools tailored for{" "}
                <span className="text-emerald-400">{answers.platform}</span> ·{" "}
                {answers.experience} level
              </p>
            </div>

            {/* Checklist progress */}
            <div className="mb-6 p-4 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)]">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Setup progress</span>
                <span className="text-emerald-400">{progress} / {recommendations.length} done</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{
                    width: `${recommendations.length ? (progress / recommendations.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec) => {
                const tool = getToolById(rec.toolId);
                const catInfo = getCategoryInfo(rec.category);
                if (!tool) return null;
                return (
                  <div key={rec.category}>
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() => toggle(rec.toolId)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center text-sm transition-colors ${
                          isChecked(rec.toolId)
                            ? "bg-emerald-500 border-emerald-500 text-slate-900"
                            : "border-slate-600 text-transparent hover:border-emerald-500"
                        }`}
                        aria-label={`Mark ${tool.name} as installed`}
                      >
                        ✓
                      </button>
                      <span className="text-sm text-slate-500">
                        {catInfo?.icon} {catInfo?.name}
                      </span>
                    </div>
                    <ToolCard tool={tool} reason={rec.reason} />
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  recommendations.forEach((rec) => {
                    if (!isSaved(rec.toolId)) toggleSave(rec.toolId);
                  });
                }}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-center transition-colors"
              >
                Save All to My Stack →
              </button>
              <Link
                to="/my-stack"
                className="px-6 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-semibold text-center transition-colors"
              >
                View My Stack
              </Link>
              <button
                onClick={() => { setStepIndex(0); setAnswers({ priorities: [] }); }}
                className="px-6 py-3 rounded-xl border border-[var(--color-border)] text-slate-300 hover:text-emerald-400 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {!isResults && (
          <div className="flex justify-between mt-auto pt-8">
            <button
              onClick={back}
              disabled={stepIndex === 0}
              className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={next}
              disabled={!canProceed()}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {stepIndex === steps.length - 2 ? "See My Stack →" : "Next →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionBlock({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-xl font-semibold mb-6 text-slate-100">{question}</h2>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl border text-center transition-all ${
        selected
          ? "border-emerald-500/50 bg-emerald-500/10 scale-[1.02]"
          : "border-[var(--color-border)] hover:border-emerald-500/30"
      }`}
    >
      <span className="text-4xl block mb-3">{icon}</span>
      <span className="font-semibold text-slate-200">{label}</span>
    </button>
  );
}
