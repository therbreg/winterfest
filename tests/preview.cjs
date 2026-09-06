// Local interactive preview. Firebase is replaced with in-memory fixtures.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const mime = {'.png':'image/png','.html':'text/html; charset=utf-8','.js':'application/javascript','.mjs':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const pathname = decodeURIComponent(url.pathname);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Security-Policy', "connect-src 'self'; worker-src 'none'; form-action 'self'");
  if (pathname === '/__firebase-app.js') { res.setHeader('Content-Type','application/javascript'); return res.end('export const initializeApp = () => ({});'); }
  if (pathname === '/pwa.js') { res.setHeader('Content-Type','application/javascript'); return res.end('window.WINTERFEST_PWA={install:()=>alert("Installation ist in der Testvorschau deaktiviert.")};'); }
  if (pathname === '/service-worker.js') { res.writeHead(404); return res.end(); }
  const relative = pathname === '/' ? 'index.html' : pathname === '/__firebase-database.js' ? 'tests/firebase-stub.mjs' : pathname.slice(1);
  if (!( ['index.html','ausstattung.html','pwa.css','manifest.webmanifest','tests/firebase-stub.mjs'].includes(relative) || /^(js|styles|icons|data)\/[\w.-]+$/.test(relative))) { res.writeHead(404); return res.end(); }
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (error, content) => {
    if (error) {res.writeHead(404);return res.end();}
    if (file.endsWith('.html')) {
      content = content.toString().replace(/https:\/\/www\.gstatic\.com\/firebasejs\/[^/]+\/firebase-(app|database)\.js/g, '/__firebase-$1.js');
      content = content.replace('<head>', '<head><script>localStorage.setItem("wf_user","Vorschau");</script>');
      content = content.replace('</body>', '<div style="position:fixed;right:12px;top:42px;z-index:9999;background:#352b20;color:#fff;padding:6px 10px;font:12px sans-serif;pointer-events:none">Vorschau · nur Testdaten</div></body>');
    }
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(content);
  });
});
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${server.address().port}/#test_event_123456789012345`));
