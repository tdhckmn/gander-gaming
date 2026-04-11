import { jsPDF } from 'jspdf';

const PURPLE = [96, 25, 109];
const PURPLE_LIGHT = [139, 58, 158];
const ORANGE = [200, 120, 0];
const TEXT = [26, 34, 48];
const TEXT_MUTED = [74, 85, 104];
const TEXT_LIGHT = [113, 128, 150];
const BG = [242, 245, 248];
const BG_ALT = [232, 237, 242];
const BORDER = [176, 188, 203];
const WHITE = [255, 255, 255];

function hexLine(doc, x, y, w, r, g, b, thickness = 0.5) {
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(thickness);
  doc.line(x, y, x + w, y);
}

function sectionLabel(doc, x, y, label) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_LIGHT);
  doc.text(label.toUpperCase(), x, y, { charSpace: 1 });
  hexLine(doc, x, y + 1.5, 170, ...BORDER, 0.3);
}

function pill(doc, x, y, label, value, w = 80) {
  doc.setFillColor(...BG_ALT);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, w, 14, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_LIGHT);
  doc.text(label.toUpperCase(), x + 4, y + 5.5, { charSpace: 0.5 });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...TEXT);
  doc.text(value, x + 4, y + 11.5);
}

function dieBadge(doc, cx, cy, label, die) {
  const r = 10;
  doc.setFillColor(...PURPLE);
  doc.circle(cx, cy, r, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...WHITE);
  doc.text(die, cx, cy + 1, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(label, cx, cy + r + 4.5, { align: 'center' });
}

export function exportCharacterPDF(character) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = 210;
  const margin = 20;
  const contentW = pageW - margin * 2;

  // ── Header bar ──────────────────────────────────────────────────────────────
  doc.setFillColor(...PURPLE);
  doc.rect(0, 0, pageW, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...WHITE);
  doc.text('GROK?!', margin, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 180, 210);
  doc.text('2nd Edition — Character Sheet', margin, 23);

  // ── Name block ──────────────────────────────────────────────────────────────
  let y = 40;

  doc.setFillColor(...BG);
  doc.rect(margin, y - 4, contentW, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_LIGHT);
  doc.text('CHARACTER NAME', margin + 4, y + 1, { charSpace: 1 });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...PURPLE);
  doc.text(character.name, margin + 4, y + 11);

  // Accent line under name
  doc.setDrawColor(...PURPLE_LIGHT);
  doc.setLineWidth(1.5);
  doc.line(margin, y + 14, margin + contentW, y + 14);

  y += 26;

  // ── Attributes ──────────────────────────────────────────────────────────────
  sectionLabel(doc, margin, y, 'Attributes');
  y += 5;

  const attrs = [
    { label: 'Physical', die: character.attrs.physical },
    { label: 'Mental',   die: character.attrs.mental },
    { label: 'Social',   die: character.attrs.social },
  ];
  const dieSpacing = contentW / attrs.length;
  attrs.forEach(({ label, die }, i) => {
    const cx = margin + dieSpacing * i + dieSpacing / 2;
    dieBadge(doc, cx, y + 12, label, die);
  });

  y += 36;

  // ── Traits ──────────────────────────────────────────────────────────────────
  sectionLabel(doc, margin, y, 'Traits');
  y += 5;

  const traits = [
    ['Personality', character.traits.personality],
    ['Appearance',  character.traits.appearance],
    ['Background',  character.traits.background],
    ['Motivation',  character.traits.motivation],
    ['Trouble',     character.traits.trouble],
  ];

  const colW = (contentW - 4) / 2;
  traits.forEach(([label, value], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + col * (colW + 4);
    pill(doc, x, y + row * 18, label, value, colW);
  });

  // Last odd trait centered
  if (traits.length % 2 !== 0) {
    // already handled above — last item sits in col 0 of its row
  }

  y += Math.ceil(traits.length / 2) * 18 + 8;

  // ── Assets ──────────────────────────────────────────────────────────────────
  sectionLabel(doc, margin, y, 'Assets');
  y += 5;

  const assets = [
    ['Outfit',    character.assets.outfit],
    ['Accessory', character.assets.accessory],
    ['Weapon',    character.assets.weapon],
    ['Oddity',    character.assets.oddity],
    [`Misc: ${character.assets.miscType}`, character.assets.misc],
  ];

  assets.forEach(([label, value], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + col * (colW + 4);
    pill(doc, x, y + row * 18, label, value, colW);
  });

  y += Math.ceil(assets.length / 2) * 18 + 10;

  // ── Notes block ─────────────────────────────────────────────────────────────
  sectionLabel(doc, margin, y, 'Notes');
  y += 5;

  doc.setFillColor(...BG);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 36, 2, 2, 'FD');

  // ruled lines inside notes box
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.2);
  for (let ly = y + 9; ly < y + 36; ly += 9) {
    doc.line(margin + 4, ly, margin + contentW - 4, ly);
  }

  // ── Footer ──────────────────────────────────────────────────────────────────
  doc.setFillColor(...PURPLE);
  doc.rect(0, 287, pageW, 10, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 180, 210);
  doc.text('gandergaming.com  •  Grok?! is 100% made by free-range humans.', pageW / 2, 293, { align: 'center' });

  doc.save(`${character.name.replace(/\s+/g, '-')}-grok-character.pdf`);
}
