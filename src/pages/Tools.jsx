import CharacterGenerator from '../components/tools/CharacterGenerator.jsx';
import SceneGenerator from '../components/tools/SceneGenerator.jsx';
import AssetGenerator from '../components/tools/AssetGenerator.jsx';
import NPCGenerator from '../components/tools/NPCGenerator.jsx';
import { useSEO } from '../hooks/useSEO.js';

export default function Tools() {
  useSEO({
    title: 'Grok?! Toolbox — Gander Gaming',
    description: 'Free online generators for Grok?! 2nd Edition — random characters, scenes, NPCs, and assets for your science fantasy RPG sessions.',
    canonical: 'https://gandergaming.com/tools',
  });
  return (
    <section className="section">
      <div className="container">
        <div className="page-header" style={{ paddingTop: 0 }}>
          <span className="tag tag-orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            Grok?! Toolbox
          </span>
          <h1>Tools</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: 560, marginTop: '0.5rem' }}>
            Random generators for your Grok?! sessions.<br />Roll once, roll often.<br />Nearly anything is plausible.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <CharacterGenerator />
          <hr className="divider" />
          <SceneGenerator />
          <hr className="divider" />
          <NPCGenerator />
          <hr className="divider" />
          <AssetGenerator />
        </div>
      </div>
    </section>
  );
}
