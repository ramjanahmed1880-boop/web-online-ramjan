# RAMJANWEB.ONLINE — ULTRA PREMIUM 3D PERSONAL WEBSITE

Welcome to **RAMJANWEB.ONLINE**, an ultra-premium, 3D animated, neon-glow personal website built strictly using **HTML5, CSS3, and Vanilla JavaScript (ES6+)**.

- **Website Name**: RAMJAN AHMED
- **Official Domain**: [https://ramjanweb.online](https://ramjanweb.online)
- **Reference Inspiration**: [https://devyeasin.online](https://devyeasin.online)

---

## 🌟 Key Features

1. **Pure Vanilla Technology**: Built without any React, Node.js runtime framework, Tailwind CSS runtime, or build bundlers. Uses 100% native Web Standards.
2. **3D Canvas Particle Background**: Interactive 3D particle constellation canvas responding to desktop mouse movements and mobile touch.
3. **Advanced Desktop 3D Mouse Effects**:
   - Custom Glowing Animated Cursor with trailing aura.
   - 3D Card Tilt physics (`perspective` and 3D rotation).
   - Magnetic button pull effect.
4. **Mobile Finger Touch Feedback**:
   - Touch ripple feedback on tap.
   - Finger-following ambient glow.
   - Mobile touch 3D card tilt & gesture drawer.
5. **Free Website — Version Management (`free-website.html`)**:
   - Lists version cards with Version Name, Version Number, File Size, Update Date, Download Button, Visit Website Button, and Password Protection status.
   - Action types: Direct File Download, External Web Link, or Password-Protected Modal Verification.
6. **Premium Apps Repository (`premium-apps.html`)**:
   - Showcases premium mobile & web applications with individual logo, versioning, size, and password authorization.
7. **Popup Notice System (`js/popup.js`)**:
   - Dynamic announcement banner with WhatsApp and Telegram buttons.
   - Flexible display triggers: Every Visit, First Visit Only, Once Per Session, or Time Interval.
8. **Floating Contact Button & Slide Panel**:
   - Fixed bottom-right animated contact button opening a slide-out panel for WhatsApp, Telegram, Email, Phone, and Messenger.
9. **Secure External API Integration (`js/api.js` & `js/config.js`)**:
   - Content and version lists load directly from an external secure API.
   - If the API returns no items or is offline, clean empty states render smoothly without breaking.
10. **Render Static Site & GitHub Ready**:
    - Zero Node.js build required on deployment.

---

## 📁 File Structure

```
ramjanweb/
├── index.html            # Main Home page with Hero, 3D Avatar, Highlights & Social Links
├── about.html            # About Ramjan Ahmed, Experience & Skills Matrix
├── free-website.html     # Free Website Version Management & Downloads
├── premium-apps.html     # Premium Applications & Software Repository
├── projects.html         # Portfolio Projects Grid with Live Demos & Code Links
├── services.html         # Professional Services (Web, Security, 3D UI, Mobile)
├── contact.html          # Contact Page with Interactive Form & Channel Shortcuts
├── 404.html              # Custom 3D Neon 404 Error Page
│
├── css/
│   ├── style.css         # CSS Variables, Dark Cyber Palette, Typography, Canvas
│   ├── components.css    # Glassmorphism Cards, Buttons, Top Bar Contract, Modals, Cursor
│   ├── animations.css    # CSS3 Keyframe Animations, Touch Ripple, Scroll Reveal
│   └── responsive.css    # Mobile Drawer, Grid Breakpoints, Touch Device Overrides
│
├── js/
│   ├── config.js         # API Base URL, Site Metadata & Asset Paths
│   ├── api.js            # External API Fetch Service & Secure Password Verification
│   ├── navigation.js     # Sticky Header, Active Links, Scroll Progress & Mobile Drawer
│   ├── animations.js     # HTML5 Canvas 3D Particle Constellation Engine
│   ├── mouse-effects.js  # Desktop Custom Cursor, 3D Card Tilt & Magnetic Physics
│   ├── touch-effects.js  # Mobile Touch Ripple, Finger Glow & Touch 3D Tilt
│   ├── downloads.js      # Password Security Verification & File Download Controller
│   ├── popup.js          # Announcement Popup Modal Engine & Display Interval Check
│   ├── social-links.js   # Dynamic Social Links Renderer
│   ├── contact.js        # Floating Contact Panel & Contact Form Submission
│   └── main.js           # Core Orchestration Script & Empty State Engine
│
├── favicon.ico           # SVG Vector Site Icon
├── robots.txt            # Search Engine Crawler Directives
├── sitemap.xml           # XML Site Map for SEO Indexing
└── README.md             # Project Documentation & Deployment Guide
```

---

## ⚙️ External API Configuration

The website content (Versions, Premium Apps, Projects, Services, Popup Notice, Social Links) is managed via an external secure API.

To update your API endpoint:
1. Open `/js/config.js`.
2. Modify the `API_BASE_URL` constant:
   ```javascript
   API_BASE_URL: "https://your-api-domain.com/v1"
   ```

---

## 🚀 GitHub Upload & Render Deployment Guide

### 1. Upload to GitHub
1. Initialize Git in the project root:
   ```bash
   git init
   git add .
   git commit -m "Deploy RAMJANWEB.ONLINE ultra premium website"
   ```
2. Link your repository and push:
   ```bash
   git remote add origin https://github.com/your-username/ramjanweb.git
   git branch -M main
   git push -u origin main
   ```

### 2. Render Deployment Instructions (Static Site)
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Static Site**.
3. Connect your GitHub repository (`ramjanweb`).
4. Set the following build options:
   - **Name**: `ramjanweb-online`
   - **Branch**: `main`
   - **Build Command**: *(leave EMPTY or clear)*
   - **Publish Directory**: `.`
5. Click **Create Static Site**.
6. Render will instantly deploy your static HTML5/CSS3/JS website!
