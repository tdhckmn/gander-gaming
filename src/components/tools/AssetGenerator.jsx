import { useState } from 'react';
import { generateAsset } from '../../data/tables.js';

export default function AssetGenerator() {
  const [asset, setAsset] = useState(null);

  return (
    <div className="tool-section">
      <div className="tool-header">
        <h2>Random Asset</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          One weird, wonderful item from the asset table.
        </p>
      </div>
      <button className="btn btn-outline" onClick={() => setAsset(generateAsset())}>
        Roll Asset
      </button>

      {asset && (
        <div className="tool-result">
          <p className="result-asset">{asset}</p>
        </div>
      )}
    </div>
  );
}
