import fs from 'fs';

const html = fs.readFileSync('recon/index.html', 'utf8');

const s2Match = html.match(/<section[^>]*class="[^"]*home-screen__step-2"[^>]*>([\s\S]*?)<\/section>/i);

if (s2Match) {
  console.log('=== STEP-2 CONTENT ===');
  console.log(s2Match[0]);
}
