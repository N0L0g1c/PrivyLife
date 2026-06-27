# PrivyLife — Privacy Hub

Your ultimate privacy toolkit for **Windows** and **Linux**. PrivyLife helps you discover, compare, and link to the best privacy-respecting apps — all from one place.

**Download:** [GitHub Releases](https://github.com/N0L0g1c/PrivyLife/releases)

## Features

- **35+ curated tools** across 15 categories (browsers, VPN, password managers, email, messaging, DNS, and more)
- **Privacy Stack Wizard** — answer 4 questions and get a personalized toolkit with direct download links
- **Browse & search** — filter by platform, category, and recommended picks
- **My Stack** — save tools and track setup progress (stored locally, no accounts)
- **Direct links** — official websites, downloads, docs, and GitHub repos for every tool
- **Zero tracking** — no analytics, no cloud sync, no accounts

## Download

Get the latest desktop build from [Releases](https://github.com/N0L0g1c/PrivyLife/releases):

| Platform | Files |
|----------|-------|
| **Windows** | NSIS installer (`.exe`) + portable exe |
| **Linux** | AppImage + `.deb` |

## Development

```powershell
git clone https://github.com/N0L0g1c/PrivyLife.git
cd PrivyLife
npm install
npm run electron:dev
```

Local desktop build:

```powershell
npm run electron:build:win    # Windows
npm run electron:build:linux  # Linux
```

Output goes to the `release/` folder.

## Categories

| Category | Examples |
|----------|----------|
| Browsers | Brave, Mullvad Browser, Tor |
| Search | DuckDuckGo, Startpage, SearXNG |
| VPN | Mullvad, Proton VPN, IVPN |
| Passwords | Bitwarden, KeePassXC |
| Email | Proton Mail, Tutanota |
| Messaging | Signal, Session, SimpleX |
| DNS | NextDNS, AdGuard DNS, Quad9 |
| Ad blocking | uBlock Origin, AdGuard |
| Encryption | VeraCrypt, Cryptomator |
| File sync | Syncthing, Proton Drive |
| Notes | Standard Notes, Joplin |
| 2FA | Aegis, YubiKey |
| Firewall | simplewall (Windows), OpenSnitch (Linux) |
| OS | Linux Mint, Fedora, Windows hardening |
| Analytics | privacy.sexy, Exodus Privacy |

## Privacy Philosophy

PrivyLife itself practices what it preaches:

- All preferences saved in **localStorage** only
- **No telemetry** or analytics
- **No network requests** except when you click external links
- Open source — inspect everything

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- React Router
- Electron (desktop packaging)

## License

MIT
