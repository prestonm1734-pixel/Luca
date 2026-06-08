require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const configScript = `<script>
window.NEXT_PUBLIC_SUPABASE_URL=${JSON.stringify(SUPABASE_URL)};
window.NEXT_PUBLIC_SUPABASE_ANON_KEY=${JSON.stringify(SUPABASE_ANON_KEY)};
</script>`;

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
  .replace('<body>', `<body>\n${configScript}`);

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Luca waitlist running at http://localhost:${PORT}`);
  if (!SUPABASE_URL) console.warn('Warning: NEXT_PUBLIC_SUPABASE_URL not set — using local fallback');
});
