import { useState } from 'react';
import { generateCharacter } from '../../data/tables.js';

export default function CharacterGenerator() {
  const [character, setCharacter] = useState(null);

  return (
    <div className="tool-section">
      <div className="tool-header">
        <h2>Random Character</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Name, attributes, traits, and a full set of starting assets.
        </p>
      </div>
      <button className="btn btn-purple" onClick={() => setCharacter(generateCharacter())}>
        Roll Character
      </button>

      {character && (
        <div className="tool-result">
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
              { label: `Misc (${character.assets.miscType})`, value: character.assets.misc },
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
