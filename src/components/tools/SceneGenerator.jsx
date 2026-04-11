import { useState } from 'react';
import { generateScene } from '../../data/tables.js';

export default function SceneGenerator() {
  const [scene, setScene] = useState(null);

  return (
    <div className="tool-section">
      <div className="tool-header">
        <h2>Random Scene</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          A locale and an event combined into an opening situation.
        </p>
      </div>
      <button className="btn btn-primary" onClick={() => setScene(generateScene())}>
        Roll Scene
      </button>

      {scene && (
        <div className="tool-result">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="result-item">
              <span className="result-label">Locale</span>
              <span className="result-value">{scene.locale}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Event</span>
              <span className="result-value">{scene.event}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
