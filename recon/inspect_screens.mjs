import fs from 'fs';

const html = fs.readFileSync('recon/index.html', 'utf8');

const s1Match = html.match(/<section[^>]*id="home-screen-1"[\s\S]*?<\/section>\s*<\/section>/i) ||
                html.match(/<section[^>]*id="home-screen-1"[\s\S]*?<\/section>/i);

if (s1Match) {
  console.log('=== HOME-SCREEN-1 STRUCTURE ===');
  console.log(s1Match[0].substring(0, 1500));
}
