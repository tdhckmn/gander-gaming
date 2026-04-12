import { jsPDF } from 'jspdf';

const PURPLE       = [96, 25, 109];
const PURPLE_LIGHT = [139, 58, 158];
const TEXT         = [26, 34, 48];
const TEXT_MUTED   = [74, 85, 104];
const TEXT_LIGHT   = [113, 128, 150];
const BG           = [242, 245, 248];
const BG_ALT       = [232, 237, 242];
const BORDER       = [176, 188, 203];
const WHITE        = [255, 255, 255];

// Pill internal geometry (all mm)
const PILL_H_PAD   = 4;   // horizontal padding inside pill
const PILL_TOP     = 3;   // space above label baseline
const PILL_LABEL_H = 11;  // distance from pill top to value first baseline
const PILL_LINE_H  = 5.5; // line height for value text
const PILL_BOT     = 2.5; // space below last value line
const PILL_COL_GAP = 4;   // gap between two columns
const PILL_ROW_GAP = 3;   // gap between rows

async function loadFont(doc, path, filename, family) {
  try {
    const res = await fetch(path);
    if (!res.ok) return 'helvetica';
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary);
    doc.addFileToVFS(filename, b64);
    doc.addFont(filename, family, 'normal');
    return family;
  } catch {
    return 'helvetica';
  }
}

function sectionLabel(doc, x, y, label, contentW) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_LIGHT);
  doc.text(label.toUpperCase(), x, y, { charSpace: 1 });
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.line(x, y + 1.5, x + contentW, y + 1.5);
}

// Returns the pill height (so callers can stack correctly).
function pillHeight(doc, value, w, inkFont) {
  doc.setFont(inkFont, 'normal');
  doc.setFontSize(9.5);
  const lines = doc.splitTextToSize(value, w - PILL_H_PAD * 2);
  return PILL_LABEL_H + lines.length * PILL_LINE_H + PILL_BOT;
}

function drawPill(doc, x, y, label, value, w, inkFont) {
  doc.setFont(inkFont, 'normal');
  doc.setFontSize(9.5);
  const lines = doc.splitTextToSize(value, w - PILL_H_PAD * 2);
  const h = PILL_LABEL_H + lines.length * PILL_LINE_H + PILL_BOT;

  doc.setFillColor(...BG_ALT);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, w, h, 2, 2, 'FD');

  // Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_LIGHT);
  doc.text(label.toUpperCase(), x + PILL_H_PAD, y + PILL_TOP + 3.5, { charSpace: 0.4 });

  // Value
  doc.setFont(inkFont, 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...TEXT);
  lines.forEach((line, i) => {
    doc.text(line, x + PILL_H_PAD, y + PILL_LABEL_H + i * PILL_LINE_H);
  });

  return h;
}

// 2-column grid. Returns total height consumed.
function pillGrid(doc, x, y, items, colW, inkFont) {
  let curY = y;
  for (let i = 0; i < items.length; i += 2) {
    const lh = pillHeight(doc, items[i][1], colW, inkFont);
    const rh = items[i + 1] ? pillHeight(doc, items[i + 1][1], colW, inkFont) : 0;
    const rowH = Math.max(lh, rh);

    drawPill(doc, x, curY, items[i][0], items[i][1], colW, inkFont);
    if (items[i + 1]) {
      drawPill(doc, x + colW + PILL_COL_GAP, curY, items[i + 1][0], items[i + 1][1], colW, inkFont);
    }
    curY += rowH + PILL_ROW_GAP;
  }
  return curY - y;
}

function dieBadge(doc, cx, cy, label, die, serifFont) {
  const r = 8;
  doc.setFillColor(...PURPLE);
  doc.circle(cx, cy, r, 'F');

  doc.setFont(serifFont, 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...WHITE);
  doc.text(die, cx, cy + 2.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(label, cx, cy + r + 4.5, { align: 'center' });
}

export async function exportCharacterPDF(character) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW   = 210;
  const margin  = 20;
  const contentW = pageW - margin * 2;
  const colW    = (contentW - PILL_COL_GAP) / 2;

  const [serifFont, inkFont] = await Promise.all([
    loadFont(doc, '/fonts/DevinneSwash.ttf', 'DevinneSwash.ttf', 'DevinneSwash'),
    loadFont(doc, '/fonts/Inkfree.ttf',      'Inkfree.ttf',      'Inkfree'),
  ]);

  // ── Header bar ──────────────────────────────────────────────────────────────
  doc.setFillColor(...PURPLE);
  doc.rect(0, 0, pageW, 30, 'F');

  doc.setFont(serifFont, 'normal');
  doc.setFontSize(26);
  doc.setTextColor(200, 120, 0);
  doc.text('GROK?!', margin, 19);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 180, 210);
  doc.text('2nd Edition — Character Sheet', margin, 26);

  // ── Name block ──────────────────────────────────────────────────────────────
  let y = 37;

  doc.setFillColor(...BG);
  doc.rect(margin, y - 5, contentW, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_LIGHT);
  doc.text('CHARACTER NAME', margin + 4, y + 1, { charSpace: 1 });

  doc.setFont(serifFont, 'normal');
  doc.setFontSize(22);
  doc.setTextColor(...PURPLE);
  doc.text(character.name, margin + 4, y + 13);

  doc.setDrawColor(...PURPLE_LIGHT);
  doc.setLineWidth(1.5);
  doc.line(margin, y + 17, margin + contentW, y + 17);

  y += 28;

  // ── Attributes ──────────────────────────────────────────────────────────────
  sectionLabel(doc, margin, y, 'Attributes', contentW);
  y += 10;

  const attrs = [
    { label: 'Physical', die: character.attrs.physical },
    { label: 'Mental',   die: character.attrs.mental },
    { label: 'Social',   die: character.attrs.social },
  ];
  const dieSpacing = contentW / attrs.length;
  attrs.forEach(({ label, die }, i) => {
    const cx = margin + dieSpacing * i + dieSpacing / 2;
    dieBadge(doc, cx, y + 6, label, die, serifFont);
  });

  y += 22;

  // ── Traits ──────────────────────────────────────────────────────────────────
  sectionLabel(doc, margin, y, 'Traits', contentW);
  y += 7;

  const traits = [
    ['Personality', character.traits.personality],
    ['Appearance',  character.traits.appearance],
    ['Background',  character.traits.background],
    ['Motivation',  character.traits.motivation],
    ['Trouble',     character.traits.trouble],
  ];
  y += pillGrid(doc, margin, y, traits, colW, inkFont);
  y += 6;

  // ── Assets ──────────────────────────────────────────────────────────────────
  sectionLabel(doc, margin, y, 'Assets', contentW);
  y += 7;

  const miscLabel = `Misc: ${character.assets.miscType.charAt(0).toUpperCase() + character.assets.miscType.slice(1)}`;
  const assets = [
    ['Outfit',    character.assets.outfit],
    ['Accessory', character.assets.accessory],
    ['Weapon',    character.assets.weapon],
    ['Oddity',    character.assets.oddity],
    [miscLabel,   character.assets.misc],
  ];
  y += pillGrid(doc, margin, y, assets, colW, inkFont);
  y += 6;

  // ── Notes ───────────────────────────────────────────────────────────────────
  sectionLabel(doc, margin, y, 'Notes', contentW);
  y += 7;

  const notesH = 287 - 6 - y; // fill remaining space above footer
  doc.setFillColor(...BG);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, notesH, 2, 2, 'FD');

  // ── Footer ──────────────────────────────────────────────────────────────────
  doc.setFillColor(...PURPLE);
  doc.rect(0, 287, pageW, 10, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 180, 210);
  doc.text('gandergaming.com  •  Grok?! is 100% made by free-range humans.', pageW / 2, 293, { align: 'center' });

  doc.save(`${character.name.replace(/\s+/g, '-')}-grok-character.pdf`);
}
