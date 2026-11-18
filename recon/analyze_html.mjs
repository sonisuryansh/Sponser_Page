import fs from 'fs';

const html = fs.readFileSync('recon/index.html', 'utf8');

// Find all section IDs
const sectionRegex = /<section[^>]*id="([^"]*)"[^>]*class="([^"]*)"/g;
let m;
console.log('=== SECTIONS IN HTML ===');
while ((m = sectionRegex.exec(html)) !== null) {
  console.log(`id: "${m[1]}" | class: "${m[2]}"`);
}

// Check Header & Nav
const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
if (navMatch) {
  console.log('\n=== NAV MARKUP ===\n', navMatch[0].substring(0, 500));
}

// Check Preloader markup
const loaderMatch = html.match(/id="(?:loader|preloader|landing)"[\s\S]*?<\/section>/i) ||
                   html.match(/class="[^"]*(?:loader|preloader)[^"]*"[\s\S]*?<\/div>/i);
if (loaderMatch) {
  console.log('\n=== LOADER / LANDING MARKUP ===\n', loaderMatch[0].substring(0, 600));
}

// Find all video tags
const videoRegex = /<video[^>]*src="([^"]*)"[^>]*>/g;
console.log('\n=== VIDEO TAGS ===');
while ((m = videoRegex.exec(html)) !== null) {
  console.log(m[1]);
}
