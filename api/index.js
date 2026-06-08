const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const configScript = `<script>
window.NEXT_PUBLIC_SUPABASE_URL=${JSON.stringify(SUPABASE_URL)};
window.NEXT_PUBLIC_SUPABASE_ANON_KEY=${JSON.stringify(SUPABASE_ANON_KEY)};
</script>`;

  const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8')
    .replace('<body>', `<body>\n${configScript}`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
};
