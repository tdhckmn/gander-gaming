import { generateNPC } from '../../data/tables.js';
import { usePersisted } from '../../hooks/usePersisted.js';
import { trackEvent } from '../../utils/analytics.js';

export default function NPCGenerator() {
  const [npc, setNPC] = usePersisted('grok-npc');

  return (
    <div className="tool-section">
      <div className="tool-header">
        <h2>Random Simple NPC</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          A name, an appearance, and a background — enough to make them memorable.
        </p>
      </div>
      <button className="btn btn-purple" onClick={() => { setNPC(generateNPC()); trackEvent('roll_npc'); }}>
        Roll NPC
      </button>

      {npc && (
        <div className="tool-result">
          <div className="result-name" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{npc.name}</div>
          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">Appearance</span>
              <span className="result-value">{npc.appearance}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Background</span>
              <span className="result-value">{npc.background}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
