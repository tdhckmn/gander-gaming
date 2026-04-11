import { generateAsset } from '../../data/tables.js';
import { usePersisted } from '../../hooks/usePersisted.js';
import { trackEvent } from '../../utils/analytics.js';

export default function AssetGenerator() {
  const [asset, setAsset] = usePersisted('grok-asset');

  return (
    <div className="tool-section">
      <div className="tool-header">
        <h2>Random Asset</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          One weird, wonderful... thing?!
        </p>
      </div>
      <button className="btn btn-primary" onClick={() => { setAsset(generateAsset()); trackEvent('roll_asset'); }}>
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
