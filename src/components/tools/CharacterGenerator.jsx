import { generateCharacter } from '../../data/tables.js';
import { exportCharacterPDF } from '../../utils/exportCharacterPDF.js';
import { usePersisted } from '../../hooks/usePersisted.js';
import { trackEvent } from '../../utils/analytics.js';

export default function CharacterGenerator() {
  const [character, setCharacter] = usePersisted('grok-character');

  return (
    <div className="tool-section">
      <div className="tool-header">
        <h2>Fillable Character Sheet</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          The official Grok?! 2nd Edition character sheet — fill it out digitally or print it.
        </p>
      </div>
      <a
        href="/assets/pdf/Grok 2e Fillable Character Sheet.pdf"
        download
        className="btn btn-outline"
        onClick={() => trackEvent('download_fillable_sheet')}
      >
        ↓ Download Character Sheet
      </a>

      <div className="divider" />

      <div className="tool-header">
        <h2>Random Character</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Name, attributes, traits, and a full set of starting assets.
        </p>
      </div>
      <button className="btn btn-purple" onClick={() => { const c = generateCharacter(); setCharacter(c); trackEvent('roll_character'); }}>
        Roll Character
      </button>

      {character && (
        <div className="tool-result" style={{ position: 'relative' }}>
          <button
            className="btn btn-outline"
            onClick={() => { exportCharacterPDF(character); trackEvent('download_character_pdf'); }}
            style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
            title="Download character sheet PDF"
          >
            ↓ PDF
          </button>
          <div className="result-name">{character.name}</div>

          <p className="result-section-title">Attributes</p>
          <div className="attr-dice" style={{ marginBottom: '1.5rem' }}>
            {[
              { label: 'Physical', die: character.attrs.physical },
              { label: 'Mental', die: character.attrs.mental },
              { label: 'Social', die: character.attrs.social },
            ].map(({ label, die }) => (
              <div key={label} className="attr-die">
                <div className="die-face">{die}</div>
                <span className="die-label">{label}</span>
              </div>
            ))}
          </div>

          <p className="result-section-title">Traits</p>
          <div className="result-grid" style={{ marginBottom: '1.5rem' }}>
            {Object.entries({
              Personality: character.traits.personality,
              Appearance: character.traits.appearance,
              Background: character.traits.background,
              Motivation: character.traits.motivation,
              Trouble: character.traits.trouble,
            }).map(([label, value]) => (
              <div key={label} className="result-item">
                <span className="result-label">{label}</span>
                <span className="result-value">{value}</span>
              </div>
            ))}
          </div>

          <p className="result-section-title">Assets</p>
          <div className="result-grid">
            {[
              { label: 'Outfit', value: character.assets.outfit },
              { label: 'Accessory', value: character.assets.accessory },
              { label: 'Weapon', value: character.assets.weapon },
              { label: 'Oddity', value: character.assets.oddity },
              { label: `Misc: ${character.assets.miscType.charAt(0).toUpperCase() + character.assets.miscType.slice(1)}`, value: character.assets.misc },
            ].map(({ label, value }) => (
              <div key={label} className="result-item">
                <span className="result-label">{label}</span>
                <span className="result-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
