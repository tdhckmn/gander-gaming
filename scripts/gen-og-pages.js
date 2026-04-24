import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const base = readFileSync('dist/index.html', 'utf8');

const pages = [
  {
    dest: 'dist/grok/index.html',
    title: 'Grok?! 2nd Edition — Gander Gaming',
    description: 'A rules-light science fantasy RPG set in a post-apocalyptic world of advanced technomancy and boundless plausibility. 200-page full-color hardcover.',
    url: 'https://gandergaming.com/grok',
    image: 'https://gandergaming.com/assets/img/share-grok.png',
  },
];

for (const { dest, title, description, url, image } of pages) {
  let html = base;
  html = html.replace(/(<title>)[^<]*(<\/title>)/, `$1${title}$2`);
  html = html.replace(/(<meta name="description" content=")[^"]*"/, `$1${description}"`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*"/, `$1${image}"`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${description}"`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*"/, `$1${image}"`);

  mkdirSync(dest.substring(0, dest.lastIndexOf('/')), { recursive: true });
  writeFileSync(dest, html);
  console.log(`Generated ${dest}`);
}
