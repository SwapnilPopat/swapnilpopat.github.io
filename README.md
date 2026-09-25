# Swapnil Popat | Portfolio & Architecture Hub

> Personal portfolio, technical writing, and architecture decision logs for Swapnil Popat — IT Solutions Architect & Industry 4.0 Leader.

[![CI](https://github.com/swapnilpopat/swapnilpopat.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/swapnilpopat/swapnilpopat.github.io/actions/workflows/ci.yml)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-388bfd?logo=github&logoColor=white)](https://swapnilpopat.github.io/)
[![Dependabot](https://img.shields.io/badge/Dependabot-Active-02569B?logo=dependabot&logoColor=white)](https://github.com/swapnilpopat/swapnilpopat.github.io/blob/main/.github/dependabot.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌐 Quick Links

| Resource | Link |
| :--- | :--- |
| **Live Portfolio** | [swapnilpopat.github.io](https://swapnilpopat.github.io/) |
| **Personal Domain** | [swapnilpopat.in](https://swapnilpopat.in/) |
| **Architecture Blog** | [blog.swapnilpopat.in](https://blog.swapnilpopat.in/) |
| **LinkedIn** | [linkedin.com/in/swapnilpopat](https://www.linkedin.com/in/swapnilpopat/) |
| **Contact Email** | [popatswapnil@gmail.com](mailto:popatswapnil@gmail.com) |

---

## 📖 Overview

This repository contains the source code for the personal portfolio and digital knowledge base of **Swapnil Popat**. 

Swapnil is an **IT Solutions Architect & Team Lead** with 13+ years of enterprise experience specializing in:
- **Industry 4.0 & Smart Factory Solutions**: OEE, RTPPM, shop-floor visibility, production dashboards, and ISA-95 standard alignment.
- **IIoT & Platform Architecture**: PTC ThingWorx platform architecture, digital twin modeling, Kepware industrial connectivity, OPC-UA, MQTT, and telemetry pipelines.
- **Enterprise Architecture & Governance**: SAP LeanIX, Sparx Systems Enterprise Architect, arc42 documentation, integration landscapes, and non-functional requirements.
- **Engineering Leadership & Delivery**: Leading development & operations teams, mentoring, DevOps modernization (Docker, Kubernetes, Jenkins, CI/CD), and cross-functional delivery across global manufacturing leaders.

---

## 🗂️ Site Architecture & Pages

The site is organized into modular sections and dedicated sub-pages:

* **[Home (`/`)](https://swapnilpopat.github.io/)**: Main landing page with hero overview, professional metrics, core expertise areas, career timeline, featured projects, industry certifications, testimonials, and interactive contact grid.
* **[Projects (`/projects/`)](https://swapnilpopat.github.io/projects/)**: Curated portfolio of enterprise POCs, IoT telemetry workbench architectures, traceability solutions (TraceApp), and full-stack software applications.
* **[Architecture Notes (`/architecture-notes/`)](https://swapnilpopat.github.io/architecture-notes/)**: Practical architectural principles, patterns, digital twin strategies, and decision notes for industrial IoT and enterprise platforms.
* **[Writing (`/writing/`)](https://swapnilpopat.github.io/writing/)**: Technical essays, articles on ISA-95, digital twin systems, algorithmic complexity, LLM coding agents, and direct links to the [external blog](https://blog.swapnilpopat.in/).
* **[Resume (`/resume/`)](https://swapnilpopat.github.io/resume/)**: Comprehensive digital CV detailing current and previous roles, responsibilities, technical toolchains, and career progression.
* **[Custom 404 (`404.html`)](https://swapnilpopat.github.io/404.html)**: Styled fallback page maintaining site navigation, theme consistency, and search-engine friendly error handling.

---

## 🛠️ Tech Stack & Engineering Highlights

* **Pure Web Standards**: Zero external build dependencies — built entirely with standard **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. Fast, ultra-lightweight, and zero compilation friction.
* **Theme Switching Engine**: Built-in Dark and Light mode toggle with automatic detection of OS/browser system color preference (`prefers-color-scheme`) and persistent preference caching via `localStorage`.
* **Design System**: Material Design Expressive principles, CSS custom properties (variables), responsive flex/grid layouts, smooth hover transitions, and accessible contrast ratios.
* **SEO & Metadata**:
  * Comprehensive Open Graph (`og:*`) and Twitter Card tags for rich link previews across social platforms.
  * Structured data schema (JSON-LD) for enhanced search engine indexing.
  * Automated XML sitemap (`sitemap.xml`) and search crawler directives (`robots.txt`).
* **Performance Optimizations**:
  * Non-blocking, asynchronous Google Fonts loading with fallback swap strategy.
  * Google Analytics 4 (GA4) with user-interaction lazy loading (delays tag execution until first scroll, touch, or keypress to maximize Core Web Vitals and Lighthouse scores).
  * WebP image compression for avatar and asset delivery.

---

## 📁 Repository Structure

```text
swapnilpopat.github.io/
├── .github/
│   ├── workflows/
│   │   └── ci.yml               # Automated CI site integrity validation
│   └── dependabot.yml           # Dependabot config for weekly Actions updates
├── architecture-notes/
│   └── index.html               # Architecture patterns, principles & decision notes
├── assets/
│   ├── css/
│   │   ├── style.css            # Master stylesheet
│   │   └── style.min.css        # Production minified stylesheet
│   ├── img/
│   │   ├── apple-touch-icon.png # iOS/Android touch bookmark icon
│   │   ├── favicon.svg          # SVG vector site icon
│   │   ├── og-image.png         # Social sharing preview banner (1200x630)
│   │   └── profile.webp         # Compressed profile portrait
│   └── js/
│       ├── analytics-events.js  # GA4 custom event tracking
│       └── main.js              # Theme toggle, mobile menu, filters, dynamic experience years, and dynamic footer year
├── projects/
│   └── index.html               # Projects showcase page with MD3 filter chips
├── resume/
│   └── index.html               # Digital resume / CV page with print styles
├── writing/
│   └── index.html               # Articles and external blog directory
├── 404.html                     # Custom 404 error page
├── index.html                   # Main landing page
├── LICENSE                      # MIT Open Source License
├── manifest.json                # PWA web app manifest
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # Canonical XML sitemap
└── README.md                    # Repository documentation
```

---

## 🚀 Local Development

Because this site uses pure web standards without build tools or bundlers, running it locally is simple:

### Option 1: Python 3 (Recommended)

```bash
# Clone the repository
git clone https://github.com/swapnilpopat/swapnilpopat.github.io.git
cd swapnilpopat.github.io

# Start local HTTP server
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Node.js / npx

```bash
# Using 'serve'
npx serve .

# Or using 'http-server'
npx http-server . -p 8000
```

### Option 3: VS Code Live Server

Open the repository in Visual Studio Code, right-click `index.html`, and select **"Open with Live Server"**.

---

## 🔄 CI/CD & Automation

* **Hosting**: Automatically deployed via **GitHub Pages** from the `main` branch.
* **Continuous Integration (`.github/workflows/ci.yml`)**: GitHub Actions runs on every push and pull request to verify critical asset integrity (`index.html`, `404.html`, `assets/css/style.css`, and `assets/js/main.js`).
* **Dependency Updates (`.github/dependabot.yml`)**: Dependabot checks and updates GitHub Actions dependencies on a weekly schedule.

---

## 📬 Connect

* **Website**: [swapnilpopat.in](https://swapnilpopat.in/)
* **Blog**: [blog.swapnilpopat.in](https://blog.swapnilpopat.in/)
* **LinkedIn**: [linkedin.com/in/swapnilpopat](https://www.linkedin.com/in/swapnilpopat/)
* **GitHub**: [@swapnilpopat](https://github.com/swapnilpopat)
* **X (Twitter)**: [@swapnilpopat](https://x.com/swapnilpopat)
* **Instagram**: [@swapnilpopat](https://www.instagram.com/swapnilpopat/)
* **Facebook**: [swapnilPopat](https://www.facebook.com/swapnilPopat)
* **Email**: [popatswapnil@gmail.com](mailto:popatswapnil@gmail.com)

---

## 📄 License

The code and design of this website are available under the [MIT License](LICENSE).  
Content, articles, and personal branding &copy; Swapnil Popat. All rights reserved.