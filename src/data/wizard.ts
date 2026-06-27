import type { Platform, PrivacyLevel, ToolCategory } from "@/data/tools";

export interface WizardAnswers {
  platform: Platform;
  experience: "beginner" | "intermediate" | "advanced";
  priorities: string[];
  budget: "free" | "paid" | "any";
}

export interface WizardRecommendation {
  category: ToolCategory;
  toolId: string;
  reason: string;
}

const priorityCategoryMap: Record<string, ToolCategory[]> = {
  browsing: ["browser", "adblock", "search"],
  communication: ["email", "messaging"],
  identity: ["password", "2fa"],
  network: ["vpn", "dns", "firewall"],
  files: ["encryption", "sync", "notes"],
  system: ["os", "analytics", "studio"],
};

export function getWizardRecommendations(answers: WizardAnswers): WizardRecommendation[] {
  const recs: WizardRecommendation[] = [];
  const platform = answers.platform;

  const add = (category: ToolCategory, toolId: string, reason: string) => {
    if (!recs.some((r) => r.category === category)) {
      recs.push({ category, toolId, reason });
    }
  };

  // Core essentials for everyone
  if (answers.experience === "beginner") {
    add("browser", "brave", "Brave is the best starting point — built-in ad blocking and strong privacy defaults.");
    add("search", "duckduckgo", "Switch your default search to DuckDuckGo in two clicks.");
    add("password", "bitwarden", "Bitwarden is free and makes unique passwords effortless.");
    add("adblock", "ublock-origin", "Install uBlock Origin — the single highest-impact privacy upgrade.");
  } else if (answers.experience === "intermediate") {
    add("browser", "brave", "Brave with Shields enabled covers most threat models out of the box.");
    add("vpn", platform === "linux" ? "mullvad" : "protonvpn", "A trustworthy VPN protects traffic on public networks.");
    add("dns", "nextdns", "NextDNS blocks trackers network-wide, even outside the browser.");
    add("password", "bitwarden", "Bitwarden with 2FA enabled on your vault.");
  } else {
    add("browser", "mullvad-browser", "Mullvad Browser minimizes fingerprinting for sensitive browsing.");
    add("vpn", "mullvad", "Mullvad requires no personal information — pay anonymously.");
    add("password", "keepassxc", "KeePassXC keeps vaults fully offline and under your control.");
    add("messaging", "session", "Session needs no phone number — true pseudonymous messaging.");
  }

  // Platform-specific
  if (platform === "windows") {
    add("firewall", "simplewall", "simplewall reveals and blocks unwanted Windows app connections.");
    add("analytics", "privacy-sexy", "Run privacy.sexy scripts to disable Windows telemetry.");
    add("studio", "vassdev-windows-privacy", "VassDev's open-source tool hardens Windows 10/11 with GUI or CLI.");
  } else if (platform === "linux") {
    add("firewall", "opensnitch", "OpenSnitch gives you per-app network control on Linux.");
    add("studio", "vassdev-security-hardening", "VassDev shell scripts are a solid starting point on a fresh Linux install.");
  }

  // Priority-based additions
  for (const priority of answers.priorities) {
    const cats = priorityCategoryMap[priority] ?? [];
    for (const cat of cats) {
      if (recs.some((r) => r.category === cat)) continue;

      const toolMap: Partial<Record<ToolCategory, { id: string; reason: string }>> = {
        browser: { id: "brave", reason: "A privacy-respecting browser is your first line of defense." },
        search: { id: "startpage", reason: "Private search prevents building an interest profile." },
        vpn: { id: "mullvad", reason: "Encrypt traffic and hide your IP from your ISP." },
        password: { id: "bitwarden", reason: "Stop reusing passwords — use a manager." },
        email: { id: "protonmail", reason: "Encrypted email keeps messages private from providers." },
        messaging: { id: "signal", reason: "Signal is the gold standard for encrypted chat." },
        dns: { id: "nextdns", reason: "Block trackers before they even load." },
        adblock: { id: "ublock-origin", reason: "Block ads and trackers in every webpage." },
        encryption: { id: "veracrypt", reason: "Encrypt sensitive files and drives." },
        sync: { id: "syncthing", reason: "Sync files between devices without a cloud middleman." },
        notes: { id: "standard-notes", reason: "Keep notes encrypted end-to-end." },
        "2fa": { id: "yubikey", reason: "Hardware keys stop account takeovers even if passwords leak." },
        firewall: {
          id: platform === "windows" ? "simplewall" : "opensnitch",
          reason: "Control which apps can reach the internet.",
        },
        os: {
          id: platform === "linux" ? "linux-mint" : "windows-hardening",
          reason: platform === "linux" ? "Linux Mint is a privacy-respecting daily driver." : "Harden Windows telemetry settings.",
        },
        analytics: { id: "privacy-sexy", reason: "Automated scripts to reduce system telemetry." },
        studio: {
          id: platform === "windows" ? "vassdev-windows-privacy" : "vassdev-security-hardening",
          reason: "VassDev studio tools are built to complement your privacy stack.",
        },
      };

      const pick = toolMap[cat];
      if (pick) add(cat, pick.id, pick.reason);
    }
  }

  // Budget filter hints — always recommend free options for "free" budget
  if (answers.budget === "free") {
    // Mullvad isn't free — swap VPN rec if present
    const vpnRec = recs.find((r) => r.category === "vpn");
    if (vpnRec?.toolId === "mullvad") {
      vpnRec.toolId = "protonvpn";
      vpnRec.reason = "Proton VPN has a usable free tier when paid VPNs aren't an option.";
    }
  }

  // Always ensure messaging + email for communication priority
  if (answers.priorities.includes("communication")) {
    add("email", "protonmail", "Move sensitive email off Gmail/Outlook.");
    add("messaging", "signal", "Replace SMS/WhatsApp with encrypted Signal.");
  }

  return recs;
}

export const wizardQuestions = {
  platform: {
    question: "What's your primary operating system?",
    options: [
      { value: "windows" as Platform, label: "Windows", icon: "🪟" },
      { value: "linux" as Platform, label: "Linux", icon: "🐧" },
    ],
  },
  experience: {
    question: "How familiar are you with privacy tools?",
    options: [
      { value: "beginner" as const, label: "Just getting started", description: "I want simple, high-impact changes" },
      { value: "intermediate" as const, label: "Some experience", description: "I've used a VPN or password manager" },
      { value: "advanced" as const, label: "Privacy enthusiast", description: "I want maximum control and anonymity" },
    ],
  },
  priorities: {
    question: "What matters most to you? (pick all that apply)",
    options: [
      { value: "browsing", label: "Private browsing & search", icon: "🌐" },
      { value: "communication", label: "Secure email & messaging", icon: "💬" },
      { value: "identity", label: "Passwords & account security", icon: "🔑" },
      { value: "network", label: "Network privacy (VPN, DNS)", icon: "🛡️" },
      { value: "files", label: "Encrypted files & notes", icon: "📁" },
      { value: "system", label: "OS-level privacy & telemetry", icon: "💻" },
    ],
  },
  budget: {
    question: "What's your budget for privacy tools?",
    options: [
      { value: "free" as const, label: "Free only", description: "Open-source and free-tier tools" },
      { value: "paid" as const, label: "Willing to pay", description: "Best tools even if they cost money" },
      { value: "any" as const, label: "Mix of both", description: "Free where possible, paid when worth it" },
    ],
  },
};

export const privacyLevels: { value: PrivacyLevel; label: string; color: string }[] = [
  { value: "essential", label: "Essential", color: "text-emerald-400" },
  { value: "recommended", label: "Recommended", color: "text-sky-400" },
  { value: "advanced", label: "Advanced", color: "text-violet-400" },
];
