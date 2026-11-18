import fs from 'fs';

const html = fs.readFileSync('recon/index.html', 'utf8');

// Find all tags with id or class inside <body>
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
if (bodyMatch) {
  const bodyContent = bodyMatch[1];
  // extract immediate children or major divs/sections
  const matches = bodyContent.match(/<(?:div|section|nav|header|main)[^>]*id="[^"]*"[^>]*>/g) || [];
  console.log('Top level elements with ID:\n', matches.join('\n'));
}
