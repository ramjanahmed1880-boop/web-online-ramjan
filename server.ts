import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer, ViteDevServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Enable CORS for API requests
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Database file path
const dbPath = path.resolve(__dirname, 'data/db.json');

// Helper to read database
function readDb() {
  try {
    if (fs.existsSync(dbPath)) {
      const content = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }
  return {
    popupNotice: null,
    freeWebsiteVersions: [],
    premiumApps: [],
    projects: [],
    services: [],
    contactInfo: {},
    messages: []
  };
}

// Helper to write database
function writeDb(data: any) {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

/* ==========================================================================
   API ENDPOINTS (/v1 and /api aliases)
   ========================================================================== */

app.get(['/v1/popup-notice', '/api/popup-notice'], (req: Request, res: Response) => {
  const db = readDb();
  if (db.popupNotice && db.popupNotice.active) {
    return res.json(db.popupNotice);
  }
  return res.json({ active: false });
});

app.get(['/v1/free-website/versions', '/api/free-website/versions'], (req: Request, res: Response) => {
  const db = readDb();
  return res.json({ versions: db.freeWebsiteVersions || [] });
});

app.post(['/v1/free-website/versions', '/api/free-website/versions'], (req: Request, res: Response) => {
  const db = readDb();
  const newVersion = req.body;
  newVersion.id = newVersion.id || `fw-${Date.now()}`;
  db.freeWebsiteVersions = db.freeWebsiteVersions || [];
  db.freeWebsiteVersions.unshift(newVersion);
  writeDb(db);
  return res.json({ success: true, version: newVersion });
});

app.get(['/v1/premium-apps', '/api/premium-apps'], (req: Request, res: Response) => {
  const db = readDb();
  return res.json({ apps: db.premiumApps || [] });
});

app.post(['/v1/premium-apps', '/api/premium-apps'], (req: Request, res: Response) => {
  const db = readDb();
  const newApp = req.body;
  newApp.id = newApp.id || `app-${Date.now()}`;
  db.premiumApps = db.premiumApps || [];
  db.premiumApps.unshift(newApp);
  writeDb(db);
  return res.json({ success: true, app: newApp });
});

app.get(['/v1/projects', '/api/projects'], (req: Request, res: Response) => {
  const db = readDb();
  return res.json({ projects: db.projects || [] });
});

app.get(['/v1/services', '/api/services'], (req: Request, res: Response) => {
  const db = readDb();
  return res.json({ services: db.services || [] });
});

app.get(['/v1/contact-info', '/api/contact-info'], (req: Request, res: Response) => {
  const db = readDb();
  return res.json(db.contactInfo || {});
});

app.post(['/v1/verify-download-password', '/api/verify-download-password'], (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === '1234' || password === 'admin' || password === 'ramjanweb') {
    return res.json({
      success: true,
      authorized: true,
      downloadUrl: '#',
      message: 'Access granted successfully.'
    });
  }

  return res.status(401).json({
    success: false,
    authorized: false,
    message: 'Incorrect security access password.'
  });
});

app.post(['/v1/contact/submit', '/api/contact/submit'], (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  const db = readDb();
  db.messages = db.messages || [];
  const msgObj = { id: `msg-${Date.now()}`, name, email, subject, message, date: new Date().toISOString() };
  db.messages.unshift(msgObj);
  writeDb(db);

  return res.json({ success: true, message: 'Message received successfully.' });
});

/* ==========================================================================
   FRONTEND ROUTING & STATIC FILE SERVING
   ========================================================================== */
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  let vite: ViteDevServer | null = null;

  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  // Handle HTML Page Requests
  app.get('*', async (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/v1') || req.path.startsWith('/api')) {
      return next();
    }

    let url = req.originalUrl;
    if (url === '/' || url === '') {
      url = '/index.html';
    }

    if (!url.endsWith('.html') && !url.includes('.')) {
      url = url + '.html';
    }

    const cleanPath = url.split('?')[0];
    const targetDir = isProd ? path.resolve(__dirname, 'dist') : __dirname;
    let filePath = path.join(targetDir, cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      try {
        let template = fs.readFileSync(filePath, 'utf-8');
        if (vite) {
          template = await vite.transformIndexHtml(cleanPath, template);
        }
        return res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        if (vite) vite.ssrFixStacktrace(e);
        return next(e);
      }
    }

    const indexPath = path.join(targetDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      try {
        let template = fs.readFileSync(indexPath, 'utf-8');
        if (vite) {
          template = await vite.transformIndexHtml('/', template);
        }
        return res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        if (vite) vite.ssrFixStacktrace(e);
        return next(e);
      }
    }

    res.status(404).send('Page Not Found');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`RAMJANWEB Full-Stack Express Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
