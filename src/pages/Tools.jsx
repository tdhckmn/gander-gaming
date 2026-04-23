import { useState } from 'react';
import DiceRoller from '../components/tools/DiceRoller.jsx';
import CharacterGenerator from '../components/tools/CharacterGenerator.jsx';
import SceneGenerator from '../components/tools/SceneGenerator.jsx';
import AssetGenerator from '../components/tools/AssetGenerator.jsx';
import NPCGenerator from '../components/tools/NPCGenerator.jsx';
import { useSEO } from '../hooks/useSEO.js';

const TABS = [
  { id: 'dice',      label: 'Dice Roller' },
  { id: 'character', label: 'Character'   },
  { id: 'scene',     label: 'Scene'       },
  { id: 'npc',       label: 'NPC'         },
  { id: 'asset',     label: 'Asset'       },
];

export default function Tools() {
  const [activeTab, setActiveTab] = useState('dice');

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

        <div className="tool-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`tool-tab${activeTab === tab.id ? ' tool-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {TABS.map(tab => (
          <div key={tab.id} className="tool-tab-panel" hidden={activeTab !== tab.id}>
            {tab.id === 'dice'      && <DiceRoller />}
            {tab.id === 'character' && <CharacterGenerator />}
            {tab.id === 'scene'     && <SceneGenerator />}
            {tab.id === 'npc'       && <NPCGenerator />}
            {tab.id === 'asset'     && <AssetGenerator />}
          </div>
        ))}
      </div>
    </section>
  );
}
