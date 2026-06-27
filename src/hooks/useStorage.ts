import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "privylife-saved-tools";
const CHECKLIST_KEY = "privylife-checklist";

export function useSavedTools() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return { savedIds, toggleSave, isSaved };
}

export function useChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(CHECKLIST_KEY) ?? "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isChecked = useCallback((id: string) => !!checked[id], [checked]);

  const progress = Object.values(checked).filter(Boolean).length;

  return { checked, toggle, isChecked, progress };
}

export function openExternal(url: string) {
  if (window.electronAPI?.openExternal) {
    window.electronAPI.openExternal(url);
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

declare global {
  interface Window {
    electronAPI?: {
      openExternal: (url: string) => void;
    };
  }
}
