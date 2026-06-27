export type Platform = "windows" | "linux" | "macos" | "android" | "ios" | "web";

export type PrivacyLevel = "essential" | "recommended" | "advanced";

export type ToolCategory =
  | "browser"
  | "search"
  | "vpn"
  | "password"
  | "email"
  | "messaging"
  | "dns"
  | "adblock"
  | "encryption"
  | "sync"
  | "notes"
  | "2fa"
  | "firewall"
  | "os"
  | "analytics"
  | "studio";

export interface ToolLink {
  label: string;
  url: string;
}

export interface PrivacyTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  platforms: Platform[];
  privacyLevel: PrivacyLevel;
  openSource: boolean;
  freeTier: boolean;
  recommended: boolean;
  comingSoon?: boolean;
  pros: string[];
  cons: string[];
  links: {
    website: string;
    download?: ToolLink[];
    docs?: string;
    github?: string;
  };
  tags: string[];
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  icon: string;
  description: string;
  whyItMatters: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "browser",
    name: "Browsers",
    icon: "🌐",
    description: "Your gateway to the web — choose one that blocks trackers by default.",
    whyItMatters: "Browsers are the #1 privacy surface. Mainstream browsers collect browsing history, fingerprint you, and sync data to the cloud.",
  },
  {
    id: "search",
    name: "Search Engines",
    icon: "🔍",
    description: "Search without building a profile of your interests.",
    whyItMatters: "Search queries reveal health concerns, political views, and personal plans. Private search keeps that data out of ad profiles.",
  },
  {
    id: "vpn",
    name: "VPN",
    icon: "🛡️",
    description: "Encrypt traffic and hide your IP from ISPs and networks.",
    whyItMatters: "Your ISP logs every site you visit. Public Wi-Fi exposes traffic. A trustworthy VPN adds a layer of encryption.",
  },
  {
    id: "password",
    name: "Password Managers",
    icon: "🔑",
    description: "Unique strong passwords for every account, stored encrypted.",
    whyItMatters: "Password reuse is the leading cause of account takeovers. A password manager makes unique passwords effortless.",
  },
  {
    id: "email",
    name: "Email",
    icon: "✉️",
    description: "End-to-end encrypted email that can't be scanned for ads.",
    whyItMatters: "Gmail and Outlook scan email content. Private email providers encrypt messages so only you and recipients can read them.",
  },
  {
    id: "messaging",
    name: "Messaging",
    icon: "💬",
    description: "Encrypted chat apps that don't harvest your contacts.",
    whyItMatters: "SMS and many chat apps lack encryption or backup messages to the cloud in plaintext.",
  },
  {
    id: "dns",
    name: "DNS & Filtering",
    icon: "🌊",
    description: "Block ads, trackers, and malware at the network level.",
    whyItMatters: "Default DNS (often your ISP's) logs every domain you resolve. Privacy DNS blocks trackers before they load.",
  },
  {
    id: "adblock",
    name: "Ad & Tracker Blockers",
    icon: "🚫",
    description: "Browser extensions and system-wide blockers.",
    whyItMatters: "Trackers follow you across sites. Blocking them speeds up pages and reduces fingerprinting.",
  },
  {
    id: "encryption",
    name: "Encryption",
    icon: "🔒",
    description: "Encrypt files, drives, and backups.",
    whyItMatters: "Unencrypted disks and cloud storage can be accessed if devices are lost or accounts compromised.",
  },
  {
    id: "sync",
    name: "File Sync",
    icon: "📁",
    description: "Sync files without giving a company access to your data.",
    whyItMatters: "Dropbox and Google Drive can scan your files. Self-hosted or E2E sync keeps control with you.",
  },
  {
    id: "notes",
    name: "Notes & Docs",
    icon: "📝",
    description: "Private note-taking without cloud surveillance.",
    whyItMatters: "Notes often contain passwords, journal entries, and sensitive ideas — they deserve encryption.",
  },
  {
    id: "2fa",
    name: "Two-Factor Auth",
    icon: "📱",
    description: "Hardware keys and authenticator apps.",
    whyItMatters: "Passwords alone aren't enough. 2FA blocks most account hijacking even if passwords leak.",
  },
  {
    id: "firewall",
    name: "Firewall",
    icon: "🔥",
    description: "Control which apps can talk to the internet.",
    whyItMatters: "Many apps phone home silently. A firewall lets you audit and block unwanted connections.",
  },
  {
    id: "os",
    name: "Operating System",
    icon: "💻",
    description: "Privacy-respecting OS choices and hardening guides.",
    whyItMatters: "Windows and default Linux setups collect telemetry. Privacy-focused OS options reduce data leakage at the foundation.",
  },
  {
    id: "analytics",
    name: "Analytics Blockers",
    icon: "📊",
    description: "Stop apps and sites from building behavior profiles.",
    whyItMatters: "Analytics SDKs in apps track usage patterns, device info, and location — often without clear consent.",
  },
  {
    id: "studio",
    name: "VassDev Studio",
    icon: "🏠",
    description: "Open-source privacy tools built by Vassbrekke AS — the team behind PrivyLife.",
    whyItMatters: "These are free tools from the same studio, designed to plug directly into your privacy stack on Windows, Linux, and mobile.",
  },
];

export const privacyTools: PrivacyTool[] = [
  // BROWSERS
  {
    id: "brave",
    name: "Brave Browser",
    tagline: "Chromium-based with built-in ad/tracker blocking",
    description: "Brave blocks ads and trackers by default, includes optional Tor tabs, and doesn't sync browsing to Google.",
    category: "browser",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Built-in Shields", "Tor private windows", "Chromium compatibility"],
    cons: ["Brave Rewards/crypto controversy", "Still Chromium-based (Google influence)"],
    links: {
      website: "https://brave.com/",
      download: [
        { label: "Windows", url: "https://brave.com/download/" },
        { label: "Linux", url: "https://brave.com/linux/" },
      ],
      github: "https://github.com/brave/brave-browser",
    },
    tags: ["browser", "chromium", "ad blocking"],
  },
  {
    id: "mullvad-browser",
    name: "Mullvad Browser",
    tagline: "Tor Browser without Tor — maximum anti-fingerprinting",
    description: "Developed with the Tor Project, Mullvad Browser minimizes browser fingerprinting and comes hardened out of the box.",
    category: "browser",
    platforms: ["windows", "linux", "macos"],
    privacyLevel: "advanced",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Best-in-class anti-fingerprinting", "No account needed", "Hardened defaults"],
    cons: ["Not ideal for logins (breaks fingerprinting)", "Based on Firefox ESR"],
    links: {
      website: "https://mullvad.net/en/browser",
      download: [
        { label: "All platforms", url: "https://mullvad.net/en/download/browser/windows" },
      ],
      github: "https://github.com/mullvad/mullvad-browser",
    },
    tags: ["browser", "fingerprinting", "hardened"],
  },
  {
    id: "tor-browser",
    name: "Tor Browser",
    tagline: "Anonymity through the Tor network",
    description: "Routes traffic through volunteer relays to hide your location and identity. Essential for journalists and activists.",
    category: "browser",
    platforms: ["windows", "linux", "macos", "android"],
    privacyLevel: "advanced",
    openSource: true,
    freeTier: true,
    recommended: false,
    pros: ["Strong anonymity", "Bypasses censorship", "Onion services"],
    cons: ["Slower browsing", "Some sites block Tor", "Not for everyday logins"],
    links: {
      website: "https://www.torproject.org/",
      download: [
        { label: "Download", url: "https://www.torproject.org/download/" },
      ],
      docs: "https://tb-manual.torproject.org/",
      github: "https://github.com/TheTorProject",
    },
    tags: ["browser", "tor", "anonymity"],
  },

  // SEARCH
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    tagline: "Private search without tracking profiles",
    description: "DuckDuckGo doesn't store personal info or search history. Bangs (!w, !gh) jump directly to other sites.",
    category: "search",
    platforms: ["web", "android", "ios"],
    privacyLevel: "essential",
    openSource: false,
    freeTier: true,
    recommended: true,
    pros: ["No search history stored", "Bangs for power users", "Instant answers"],
    cons: ["Uses Bing index (Microsoft)", "US-based company"],
    links: {
      website: "https://duckduckgo.com/",
      download: [
        { label: "Browser extension", url: "https://duckduckgo.com/app" },
      ],
    },
    tags: ["search", "no tracking"],
  },
  {
    id: "startpage",
    name: "Startpage",
    tagline: "Google results without Google tracking",
    description: "Startpage proxies Google results so Google never sees your IP or cookies, while delivering familiar result quality.",
    category: "search",
    platforms: ["web"],
    privacyLevel: "recommended",
    openSource: false,
    freeTier: true,
    recommended: true,
    pros: ["Google-quality results", "EU privacy laws", "Anonymous View"],
    cons: ["Paid tier for advanced features", "Slower than direct Google"],
    links: {
      website: "https://www.startpage.com/",
    },
    tags: ["search", "google proxy"],
  },
  {
    id: "searxng",
    name: "SearXNG",
    tagline: "Self-hosted metasearch engine",
    description: "Aggregate results from multiple search engines without tracking. Host your own instance for maximum control.",
    category: "search",
    platforms: ["web", "linux"],
    privacyLevel: "advanced",
    openSource: true,
    freeTier: true,
    recommended: false,
    pros: ["Fully self-hostable", "No single point of tracking", "Highly customizable"],
    cons: ["Requires self-hosting or trusting a public instance", "Setup complexity"],
    links: {
      website: "https://searxng.org/",
      github: "https://github.com/searxng/searxng",
      docs: "https://docs.searxng.org/",
    },
    tags: ["search", "self-hosted", "metasearch"],
  },

  // VPN
  {
    id: "mullvad",
    name: "Mullvad VPN",
    tagline: "Anonymous accounts — no email required",
    description: "Mullvad generates a random account number. No email, no name, accepts cash and crypto. Independently audited.",
    category: "vpn",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: false,
    recommended: true,
    pros: ["No personal info required", "WireGuard support", "Flat €5/month", "Audited no-log policy"],
    cons: ["No free tier", "Smaller server network than giants"],
    links: {
      website: "https://mullvad.net/",
      download: [
        { label: "Windows", url: "https://mullvad.net/en/download/windows" },
        { label: "Linux", url: "https://mullvad.net/en/download/linux" },
      ],
      github: "https://github.com/mullvad/mullvadvpn-app",
    },
    tags: ["vpn", "wireguard", "anonymous"],
  },
  {
    id: "protonvpn",
    name: "Proton VPN",
    tagline: "Swiss privacy laws with a generous free tier",
    description: "From the Proton Mail team. Free tier available (limited servers). Secure Core routes through privacy-friendly countries.",
    category: "vpn",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Free tier available", "Swiss jurisdiction", "Secure Core", "Open source apps"],
    cons: ["Free tier is slower/limited", "Paid plans can be pricey"],
    links: {
      website: "https://protonvpn.com/",
      download: [
        { label: "All platforms", url: "https://protonvpn.com/download" },
      ],
      github: "https://github.com/ProtonVPN",
    },
    tags: ["vpn", "free tier", "swiss"],
  },
  {
    id: "ivpn",
    name: "IVPN",
    tagline: "Transparent, audited, privacy-first VPN",
    description: "IVPN publishes regular transparency reports, supports multi-hop, and accepts anonymous payment.",
    category: "vpn",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: false,
    recommended: false,
    pros: ["Regular audits", "AntiTracker built in", "Gibraltar jurisdiction"],
    cons: ["No free tier", "Smaller brand recognition"],
    links: {
      website: "https://www.ivpn.net/",
      download: [
        { label: "Download", url: "https://www.ivpn.net/en/apps" },
      ],
      github: "https://github.com/ivpn",
    },
    tags: ["vpn", "audited"],
  },

  // PASSWORD MANAGERS
  {
    id: "bitwarden",
    name: "Bitwarden",
    tagline: "Open-source password manager with cloud sync",
    description: "Bitwarden stores passwords encrypted end-to-end. Self-host Vaultwarden for full control, or use their cloud.",
    category: "password",
    platforms: ["windows", "linux", "macos", "android", "ios", "web"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Fully open source", "Generous free tier", "Self-hostable", "Browser extensions"],
    cons: ["UI less polished than 1Password", "Advanced features need premium"],
    links: {
      website: "https://bitwarden.com/",
      download: [
        { label: "Windows", url: "https://bitwarden.com/download/" },
        { label: "Linux", url: "https://bitwarden.com/download/" },
      ],
      github: "https://github.com/bitwarden",
      docs: "https://bitwarden.com/help/",
    },
    tags: ["password", "sync", "2fa codes"],
  },
  {
    id: "keepassxc",
    name: "KeePassXC",
    tagline: "Offline-first local password vault",
    description: "KeePassXC stores passwords in an encrypted local database. No cloud, no account — you control the file.",
    category: "password",
    platforms: ["windows", "linux", "macos"],
    privacyLevel: "advanced",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Fully offline", "No account needed", "YubiKey support", "Auto-type"],
    cons: ["Manual sync between devices", "No built-in cloud backup"],
    links: {
      website: "https://keepassxc.org/",
      download: [
        { label: "Windows", url: "https://keepassxc.org/download/#windows" },
        { label: "Linux", url: "https://keepassxc.org/download/#linux" },
      ],
      github: "https://github.com/keepassxreboot/keepassxc",
    },
    tags: ["password", "offline", "local"],
  },

  // EMAIL
  {
    id: "protonmail",
    name: "Proton Mail",
    tagline: "End-to-end encrypted email from Switzerland",
    description: "Proton Mail encrypts emails so Proton can't read them. Includes calendar, drive, and VPN in ecosystem.",
    category: "email",
    platforms: ["web", "android", "ios", "windows", "linux"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Zero-access encryption", "Swiss privacy laws", "Free tier", "Proton ecosystem"],
    cons: ["Free tier limited storage", "Can't fully encrypt to non-Proton users without setup"],
    links: {
      website: "https://proton.me/mail",
      download: [
        { label: "Desktop apps", url: "https://proton.me/mail/download" },
      ],
      github: "https://github.com/ProtonMail",
    },
    tags: ["email", "encryption", "swiss"],
  },
  {
    id: "tutanota",
    name: "Tutanota",
    tagline: "Encrypted email with encrypted calendar and contacts",
    description: "Tutanota encrypts entire mailbox including subject lines and contacts. German privacy laws apply.",
    category: "email",
    platforms: ["web", "android", "ios", "linux", "windows"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Encrypts metadata too", "Open source", "Affordable premium", "No Google reCAPTCHA"],
    cons: ["Custom domains on paid plans", "Smaller ecosystem than Proton"],
    links: {
      website: "https://tuta.com/",
      download: [
        { label: "Apps", url: "https://tuta.com/apps" },
      ],
      github: "https://github.com/tutao/tutanota",
    },
    tags: ["email", "encryption", "german"],
  },

  // MESSAGING
  {
    id: "signal",
    name: "Signal",
    tagline: "Gold standard for encrypted messaging",
    description: "Signal uses the Signal Protocol for E2E encryption. Minimal metadata collection, open source, nonprofit.",
    category: "messaging",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Best-in-class encryption", "Sealed sender", "No ads ever", "Desktop apps"],
    cons: ["Requires phone number", "Cloud backup limitations on iOS"],
    links: {
      website: "https://signal.org/",
      download: [
        { label: "Windows", url: "https://signal.org/download/windows/" },
        { label: "Linux", url: "https://signal.org/download/linux/" },
      ],
      github: "https://github.com/signalapp",
    },
    tags: ["messaging", "e2e", "voice", "video"],
  },
  {
    id: "session",
    name: "Session",
    tagline: "Anonymous messaging without phone numbers",
    description: "Session uses the Oxen network for decentralized, anonymous messaging. No phone number or email required.",
    category: "messaging",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "advanced",
    openSource: true,
    freeTier: true,
    recommended: false,
    pros: ["No phone number", "Decentralized", "Onion routing"],
    cons: ["Smaller user base", "Slower message delivery sometimes"],
    links: {
      website: "https://getsession.org/",
      download: [
        { label: "Download", url: "https://getsession.org/download" },
      ],
      github: "https://github.com/oxen-io/session-desktop",
    },
    tags: ["messaging", "anonymous", "decentralized"],
  },
  {
    id: "simplex",
    name: "SimpleX Chat",
    tagline: "Messaging with no user identifiers at all",
    description: "SimpleX doesn't use phone numbers or any persistent identifiers. Messages pass through relay nodes without storing user profiles.",
    category: "messaging",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "advanced",
    openSource: true,
    freeTier: true,
    recommended: false,
    pros: ["No user IDs", "E2E encryption", "No central server with user data"],
    cons: ["Newer project", "Smaller community"],
    links: {
      website: "https://simplex.chat/",
      download: [
        { label: "Download", url: "https://simplex.chat/downloads/" },
      ],
      github: "https://github.com/simplex-chat/simplex-chat",
    },
    tags: ["messaging", "no identifiers", "e2e"],
  },

  // DNS
  {
    id: "nextdns",
    name: "NextDNS",
    tagline: "Configurable privacy DNS with analytics",
    description: "NextDNS blocks ads, trackers, and malware at DNS level. See what's blocked with a dashboard. Generous free tier.",
    category: "dns",
    platforms: ["windows", "linux", "android", "ios", "web"],
    privacyLevel: "essential",
    openSource: false,
    freeTier: true,
    recommended: true,
    pros: ["Easy setup", "Detailed blocking logs", "Custom blocklists", "300k queries/month free"],
    cons: ["Cloud service (trust required)", "Paid for unlimited queries"],
    links: {
      website: "https://nextdns.io/",
      docs: "https://help.nextdns.io/",
    },
    tags: ["dns", "blocking", "network"],
  },
  {
    id: "adguard-dns",
    name: "AdGuard DNS",
    tagline: "Privacy-focused DNS with ad blocking",
    description: "AdGuard DNS filters ads and trackers system-wide without installing an app. Family protection mode available.",
    category: "dns",
    platforms: ["windows", "linux", "android", "ios", "web"],
    privacyLevel: "recommended",
    openSource: false,
    freeTier: true,
    recommended: true,
    pros: ["No software install needed", "Family mode", "Non-filtering DNS option too"],
    cons: ["Less configurable than NextDNS free tier"],
    links: {
      website: "https://adguard-dns.io/",
      docs: "https://adguard-dns.io/kb/",
    },
    tags: ["dns", "ad blocking"],
  },
  {
    id: "quad9",
    name: "Quad9",
    tagline: "Nonprofit DNS that blocks malware",
    description: "Quad9 is a Swiss nonprofit DNS that blocks known malicious domains. No logging of personal data.",
    category: "dns",
    platforms: ["windows", "linux", "web"],
    privacyLevel: "recommended",
    openSource: false,
    freeTier: true,
    recommended: false,
    pros: ["Nonprofit", "Malware blocking", "No personal data logged", "Free"],
    cons: ["No ad/tracker blocking (malware only)", "Less configurable"],
    links: {
      website: "https://www.quad9.net/",
      docs: "https://www.quad9.net/news/blog/",
    },
    tags: ["dns", "malware", "nonprofit"],
  },

  // ADBLOCK
  {
    id: "ublock-origin",
    name: "uBlock Origin",
    tagline: "Efficient wide-spectrum blocker for browsers",
    description: "uBlock Origin is the gold standard browser extension for blocking ads, trackers, and malware domains with minimal resource use.",
    category: "adblock",
    platforms: ["web"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Extremely efficient", "Many filter lists", "Element picker", "Fully open source"],
    cons: ["Browser extension only (not system-wide)", "Manifest V3 concerns on Chrome"],
    links: {
      website: "https://ublockorigin.com/",
      download: [
        { label: "Firefox", url: "https://addons.mozilla.org/firefox/addon/ublock-origin/" },
        { label: "Chrome", url: "https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm" },
      ],
      github: "https://github.com/gorhill/uBlock",
    },
    tags: ["adblock", "extension", "trackers"],
  },
  {
    id: "adguard",
    name: "AdGuard",
    tagline: "System-wide ad and tracker blocking",
    description: "AdGuard blocks ads in all apps and browsers system-wide on Windows, Mac, and mobile. Not just a browser extension.",
    category: "adblock",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "recommended",
    openSource: false,
    freeTier: false,
    recommended: false,
    pros: ["System-wide blocking", "HTTPS filtering", "Parental controls"],
    cons: ["Paid for full features", "Requires trusting AdGuard certificate for HTTPS filtering"],
    links: {
      website: "https://adguard.com/",
      download: [
        { label: "Windows", url: "https://adguard.com/en/download.html" },
        { label: "Linux", url: "https://adguard.com/en/download.html" },
      ],
    },
    tags: ["adblock", "system-wide"],
  },

  // ENCRYPTION
  {
    id: "veracrypt",
    name: "VeraCrypt",
    tagline: "Encrypt entire drives and create hidden volumes",
    description: "VeraCrypt creates encrypted containers or encrypts full drives. Successor to TrueCrypt with security improvements.",
    category: "encryption",
    platforms: ["windows", "linux", "macos"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Full disk encryption", "Hidden volumes", "Cross-platform", "Free"],
    cons: ["No cloud integration", "Lost password = lost data"],
    links: {
      website: "https://www.veracrypt.fr/",
      download: [
        { label: "Download", url: "https://www.veracrypt.fr/en/Downloads.html" },
      ],
      github: "https://github.com/veracrypt/VeraCrypt",
    },
    tags: ["encryption", "disk", "container"],
  },
  {
    id: "cryptomator",
    name: "Cryptomator",
    tagline: "Encrypt cloud storage files client-side",
    description: "Cryptomator encrypts files before they upload to Dropbox, Google Drive, or any cloud. Only you hold the key.",
    category: "encryption",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Works with any cloud", "Client-side encryption", "Simple setup"],
    cons: ["Mobile app is paid", "No sharing encrypted folders easily"],
    links: {
      website: "https://cryptomator.org/",
      download: [
        { label: "Download", url: "https://cryptomator.org/downloads/" },
      ],
      github: "https://github.com/cryptomator/cryptomator",
    },
    tags: ["encryption", "cloud", "files"],
  },

  // SYNC
  {
    id: "syncthing",
    name: "Syncthing",
    tagline: "Continuous peer-to-peer file sync",
    description: "Syncthing syncs files directly between your devices without a cloud middleman. Open source and decentralized.",
    category: "sync",
    platforms: ["windows", "linux", "macos", "android"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["No cloud server", "E2E encrypted sync", "Versioning", "Free forever"],
    cons: ["Both devices must be online", "No web interface for files by default"],
    links: {
      website: "https://syncthing.net/",
      download: [
        { label: "Download", url: "https://syncthing.net/downloads/" },
      ],
      github: "https://github.com/syncthing/syncthing",
      docs: "https://docs.syncthing.net/",
    },
    tags: ["sync", "p2p", "files"],
  },
  {
    id: "proton-drive",
    name: "Proton Drive",
    tagline: "End-to-end encrypted cloud storage",
    description: "Proton Drive encrypts files client-side before upload. From the Proton ecosystem with Swiss privacy laws.",
    category: "sync",
    platforms: ["web", "windows", "macos", "android", "ios"],
    privacyLevel: "recommended",
    openSource: false,
    freeTier: true,
    recommended: true,
    pros: ["E2E encrypted cloud", "Easy sharing", "Proton ecosystem"],
    cons: ["Free storage limited", "No Linux desktop app yet"],
    links: {
      website: "https://proton.me/drive",
      download: [
        { label: "Apps", url: "https://proton.me/drive/download" },
      ],
    },
    tags: ["cloud", "sync", "encryption"],
  },

  // NOTES
  {
    id: "standard-notes",
    name: "Standard Notes",
    tagline: "Encrypted notes that sync across devices",
    description: "Standard Notes encrypts every note before it leaves your device. Extensions add markdown, tasks, and more.",
    category: "notes",
    platforms: ["windows", "linux", "macos", "android", "ios", "web"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["E2E encrypted sync", "Cross-platform", "Extensions ecosystem"],
    cons: ["Premium for some extensions", "Plain text focused"],
    links: {
      website: "https://standardnotes.com/",
      download: [
        { label: "Download", url: "https://standardnotes.com/download" },
      ],
      github: "https://github.com/standardnotes",
    },
    tags: ["notes", "encryption", "sync"],
  },
  {
    id: "joplin",
    name: "Joplin",
    tagline: "Open-source notes with optional E2E encryption",
    description: "Joplin supports markdown notes with sync via Dropbox, Nextcloud, or local. E2E encryption available.",
    category: "notes",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: false,
    pros: ["Rich markdown", "Self-host sync", "Web clipper", "Fully free"],
    cons: ["E2E encryption is optional (must enable)", "UI can feel cluttered"],
    links: {
      website: "https://joplinapp.org/",
      download: [
        { label: "Download", url: "https://joplinapp.org/download/" },
      ],
      github: "https://github.com/laurent22/joplin",
    },
    tags: ["notes", "markdown", "self-host"],
  },

  // 2FA
  {
    id: "aegis",
    name: "Aegis Authenticator",
    tagline: "Open-source 2FA app for Android",
    description: "Aegis stores TOTP codes encrypted on-device with biometric unlock. Export and backup supported.",
    category: "2fa",
    platforms: ["android"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Fully open source", "Encrypted vault", "Export/import", "Free"],
    cons: ["Android only"],
    links: {
      website: "https://getaegis.app/",
      download: [
        { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.beemdevelopment.aegis" },
        { label: "F-Droid", url: "https://f-droid.org/packages/com.beemdevelopment.aegis/" },
      ],
      github: "https://github.com/beemdevelopment/Aegis",
    },
    tags: ["2fa", "totp", "android"],
  },
  {
    id: "yubikey",
    name: "YubiKey",
    tagline: "Hardware security keys for phishing-proof 2FA",
    description: "YubiKeys provide FIDO2/WebAuthn authentication. Physical key required — immune to phishing and SIM swaps.",
    category: "2fa",
    platforms: ["windows", "linux", "macos", "android", "ios"],
    privacyLevel: "essential",
    openSource: false,
    freeTier: false,
    recommended: true,
    pros: ["Phishing-proof", "Works with most major services", "No battery"],
    cons: ["Costs money (~$25+)", "Can be lost (need backup key)"],
    links: {
      website: "https://www.yubico.com/",
      download: [
        { label: "Shop", url: "https://www.yubico.com/store/" },
      ],
      docs: "https://www.yubico.com/setup/",
    },
    tags: ["2fa", "hardware", "fido2"],
  },

  // FIREWALL
  {
    id: "simplewall",
    name: "simplewall",
    tagline: "Lightweight Windows firewall with simple UI",
    description: "simplewall uses the Windows Filtering Platform to block app connections. See and control every app's network access.",
    category: "firewall",
    platforms: ["windows"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Simple UI", "Block Windows telemetry", "Open source", "Lightweight"],
    cons: ["Windows only", "Can break apps if misconfigured"],
    links: {
      website: "https://github.com/henrypp/simplewall",
      download: [
        { label: "GitHub Releases", url: "https://github.com/henrypp/simplewall/releases" },
      ],
      github: "https://github.com/henrypp/simplewall",
    },
    tags: ["firewall", "windows", "telemetry"],
  },
  {
    id: "opensnitch",
    name: "OpenSnitch",
    tagline: "Application firewall for Linux",
    description: "OpenSnitch prompts when apps try to connect, like Little Snitch on macOS. Control outbound connections on Linux.",
    category: "firewall",
    platforms: ["linux"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Per-app prompts", "Open source", "Rule system"],
    cons: ["Linux only", "Requires setup (systemd)"],
    links: {
      website: "https://github.com/evilsocket/opensnitch",
      download: [
        { label: "Install guide", url: "https://github.com/evilsocket/opensnitch/wiki/Installation" },
      ],
      github: "https://github.com/evilsocket/opensnitch",
    },
    tags: ["firewall", "linux"],
  },

  // OS
  {
    id: "linux-mint",
    name: "Linux Mint",
    tagline: "Privacy-friendly Linux for Windows switchers",
    description: "Linux Mint is Ubuntu-based but removes Snap and adds privacy-respecting defaults. Great first Linux distro.",
    category: "os",
    platforms: ["linux"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["No forced telemetry", "Familiar desktop", "Large community", "Free"],
    cons: ["Learning curve from Windows", "Some software unavailable"],
    links: {
      website: "https://linuxmint.com/",
      download: [
        { label: "Download", url: "https://linuxmint.com/download.php" },
      ],
    },
    tags: ["linux", "desktop", "mint"],
  },
  {
    id: "fedora",
    name: "Fedora Linux",
    tagline: "Cutting-edge open-source desktop OS",
    description: "Fedora ships latest GNOME/KDE with strong security defaults. Sponsored by Red Hat, fully open source.",
    category: "os",
    platforms: ["linux"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: false,
    pros: ["Latest software", "Strong security", "Wayland default", "No proprietary blobs by default"],
    cons: ["Some hardware needs extra drivers", "Shorter release cycle"],
    links: {
      website: "https://fedoraproject.org/",
      download: [
        { label: "Workstation", url: "https://fedoraproject.org/workstation/download/" },
      ],
    },
    tags: ["linux", "desktop", "gnome"],
  },
  {
    id: "windows-hardening",
    name: "Windows Privacy Guide",
    tagline: "Harden Windows 10/11 without switching OS",
    description: "Use O&O ShutUp10++, disable telemetry, and configure Windows for minimum data collection while keeping compatibility.",
    category: "os",
    platforms: ["windows"],
    privacyLevel: "essential",
    openSource: false,
    freeTier: true,
    recommended: true,
    pros: ["Keep Windows apps/games", "Free tools available", "Immediate improvement"],
    cons: ["Windows still phones home somewhat", "Updates may revert settings"],
    links: {
      website: "https://www.oo-software.com/en/shutup10",
      download: [
        { label: "O&O ShutUp10++", url: "https://www.oo-software.com/en/shutup10/download" },
      ],
      docs: "https://privacy.sexy/",
    },
    tags: ["windows", "hardening", "telemetry"],
  },

  // ANALYTICS
  {
    id: "privacy-sexy",
    name: "privacy.sexy",
    tagline: "Automated privacy scripts for Windows & Linux",
    description: "privacy.sexy provides audited scripts to disable telemetry, bloatware, and tracking on Windows and Linux with one click.",
    category: "analytics",
    platforms: ["windows", "linux"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["One-click hardening", "Open source scripts", "Windows + Linux", "Audited"],
    cons: ["Review scripts before running", "Can break features if too aggressive"],
    links: {
      website: "https://privacy.sexy/",
      download: [
        { label: "Download", url: "https://privacy.sexy/#download" },
      ],
      github: "https://github.com/privacy-sexy/privacy.sexy",
    },
    tags: ["hardening", "telemetry", "scripts"],
  },
  {
    id: "exodus-privacy",
    name: "Exodus Privacy",
    tagline: "See what trackers are in your Android apps",
    description: "Exodus Privacy scans APKs for embedded trackers and permissions. Know what apps spy on you before installing.",
    category: "analytics",
    platforms: ["web", "android"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Tracker database", "APK analysis", "Open source"],
    cons: ["Android focused", "Won't catch runtime trackers"],
    links: {
      website: "https://exodus-privacy.eu.org/",
      github: "https://github.com/Exodus-Privacy/exodus-android-app",
    },
    tags: ["android", "trackers", "audit"],
  },

  // VASSDEV STUDIO
  {
    id: "vassdev-privylife",
    name: "PrivyLife",
    tagline: "This app — your privacy hub in one place",
    description: "PrivyLife is a VassDev open-source desktop app that helps you discover, compare, and link to privacy-respecting tools. You're using it right now.",
    category: "studio",
    platforms: ["windows", "linux"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Curated privacy tool directory", "Personalized stack wizard", "100% local — no tracking", "Direct download links"],
    cons: ["Desktop only (Windows & Linux)", "Curates tools — doesn't replace them"],
    links: {
      website: "https://vassbrekke.no/vassdev/",
      download: [
        { label: "GitHub Releases", url: "https://github.com/N0L0g1c/PrivyLife/releases" },
      ],
      github: "https://github.com/N0L0g1c/PrivyLife",
    },
    tags: ["vassdev", "studio", "hub", "desktop"],
  },
  {
    id: "vassdev-windows-privacy",
    name: "Windows 11 Privacy Tool",
    tagline: "Open-source GUI & CLI to harden Windows 10/11",
    description: "A Python tool from VassDev that enhances privacy on Windows 10 and 11. Choose between a graphical interface or command line to reduce telemetry and tighten system privacy settings.",
    category: "studio",
    platforms: ["windows"],
    privacyLevel: "essential",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["GUI and CLI modes", "Built for Windows 10/11", "Open source on GitHub", "Free from VassDev"],
    cons: ["Windows only", "Review changes before applying", "May require re-running after major updates"],
    links: {
      website: "https://vassbrekke.no/vassdev/",
      download: [
        { label: "GitHub", url: "https://github.com/N0L0g1c/Windows-11-Privacy-Enhancing-tool-GUI-and-CLI" },
      ],
      github: "https://github.com/N0L0g1c/Windows-11-Privacy-Enhancing-tool-GUI-and-CLI",
    },
    tags: ["vassdev", "studio", "windows", "telemetry", "hardening"],
  },
  {
    id: "vassdev-security-hardening",
    name: "Security Hardening",
    tagline: "Shell scripts to secure a fresh install",
    description: "VassDev's open-source shell scripts give you a practical starting point for security hardening on a new system — a sensible first step before layering on other privacy tools.",
    category: "studio",
    platforms: ["linux", "windows"],
    privacyLevel: "recommended",
    openSource: true,
    freeTier: true,
    recommended: true,
    pros: ["Great for fresh installs", "Open source", "Lightweight shell scripts", "Pairs well with other hardening tools"],
    cons: ["Not a full hardening suite alone", "Review scripts before running", "Linux-focused workflows"],
    links: {
      website: "https://vassbrekke.no/vassdev/",
      download: [
        { label: "GitHub", url: "https://github.com/N0L0g1c/SecurityHardening" },
      ],
      github: "https://github.com/N0L0g1c/SecurityHardening",
    },
    tags: ["vassdev", "studio", "hardening", "scripts"],
  },
  {
    id: "vassdev-deepcleaner",
    name: "DeepCleaner",
    tagline: "Free phone cleaner — cache, junk & old media",
    description: "Coming soon from VassDev Mobile Studio. DeepCleaner safely clears cache, browser junk, app logs, and old media on Android and iOS — reducing data trails left on your phone.",
    category: "studio",
    platforms: ["android", "ios"],
    privacyLevel: "recommended",
    openSource: false,
    freeTier: true,
    recommended: false,
    comingSoon: true,
    pros: ["Safe & thorough cleaning", "Targets browser junk and app logs", "Free mobile tool", "From VassDev Mobile Studio"],
    cons: ["Coming soon — not yet released", "Mobile only"],
    links: {
      website: "https://vassbrekke.no/vassdev/",
      docs: "https://vassbrekke.no/vassdev/",
    },
    tags: ["vassdev", "studio", "mobile", "cleaner", "coming-soon"],
  },
];

export function getCategoryInfo(id: ToolCategory): CategoryInfo | undefined {
  return categories.find((c) => c.id === id);
}

export function getToolsByCategory(category: ToolCategory): PrivacyTool[] {
  return privacyTools.filter((t) => t.category === category);
}

export function getRecommendedTools(): PrivacyTool[] {
  return privacyTools.filter((t) => t.recommended);
}

export function getStudioTools(): PrivacyTool[] {
  return privacyTools.filter((t) => t.tags.includes("vassdev"));
}

export function getToolById(id: string): PrivacyTool | undefined {
  return privacyTools.find((t) => t.id === id);
}

export function searchTools(query: string): PrivacyTool[] {
  const q = query.toLowerCase().trim();
  if (!q) return privacyTools;
  return privacyTools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.includes(q)) ||
      t.category.includes(q)
  );
}

export function filterByPlatform(tools: PrivacyTool[], platform: Platform): PrivacyTool[] {
  return tools.filter((t) => t.platforms.includes(platform));
}
