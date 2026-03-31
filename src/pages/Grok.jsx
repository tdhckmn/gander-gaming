import { Link } from 'react-router-dom';
import heroSrc from '/assets/img/hero-grok.png';

const loreLines = [
  '…was once a haven of trans-dimensional migrants and a hub of advanced technomancy.',
  'Until a malfunction with the mana-syphon at the planet\'s core splintered the world.',
  'Now, a derelict shell of a space station bathes the planet\'s surface in phosphorescent radiation.',
  'Isles float among clouds above the splintered wastelands.',
  'Devolved monstrosities haunt the labyrinthine underworld.',
  'And an eldritch breed is cast forth from the malignant Voidstar in the hollow of the planet.',
];

const touchstones = [
  'Arzach', 'Brazil', 'Discworld', 'Dying Earth', 'Fantastic Planet',
  'Flash Gordon', 'Heavy Metal', 'Space Team', "The Hitchhiker's Guide to the Galaxy",
  'The Labyrinth', 'Wizards',
];

const includes = [
  'Refined Core Rules',
  'Expanded Setting',
  'Full Campaign',
  'Solo Rules',
  'GM Toolkits',
  'GM Screen',
  'Pregen Character Pad',
  'Zine SRD',
  'Coloring Book',
  'Dice Set',
];

export default function Grok() {
  return (
    <>
      {/* Hero */}
      <div className="grok-hero">
        <img className="grok-hero-img" src={heroSrc} alt="Planet Grok" />
        <div className="grok-hero-content">
          <span className="tag tag-purple" style={{ marginBottom: '1rem', alignSelf: 'flex-start', background: 'rgba(234,213,238,0.2)', color: '#e0c0e8' }}>
            2nd Edition
          </span>
          <h1>Planet Grok</h1>
          <p>A science-fantasy RPG of post-apocalyptic technomancy and boundless plausibility.</p>
        </div>
      </div>

      {/* Lore */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <h2 style={{ marginBottom: '2rem' }}>The World</h2>
            {loreLines.map((line, i) => (
              <div key={i} className="lore-block">
                <p>{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ marginBottom: '1rem' }}>About the Game</h2>
              <p>
                Grok?! is a <strong>rules-light science fantasy RPG</strong> set in a post-apocalyptic world
                of advanced technomancy and boundless plausibility. Nearly anything is plausible.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Grok?! is 100% made by free-range humans. Grok — both the term and the game — were around
                long before anyone else tried to claim it. We're not letting them have it.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                The 2nd Edition is a <strong>200-page full-color hardcover</strong>, complete with everything
                you need to explore, survive, and thrive on Planet Grok.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                <a
                  href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-purple btn-lg"
                >
                  Back on Kickstarter
                </a>
                <Link to="/tools" className="btn btn-outline btn-lg">Try the Tools</Link>
              </div>
            </div>

            <div>
              <div className="card card-raised" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>What's Included</h3>
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem' }}>
                  {includes.map(item => (
                    <li key={item} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: 'var(--purple)', fontWeight: 700 }}>✦</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Inspirational Touchstones</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {touchstones.map(t => (
                    <span key={t} className="tag tag-purple">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>What You Can Do</h2>
          <div className="grid-2">
            {[
              { heading: 'Sail the Aether', body: 'Cross the starry aether and explore alien worlds aboard your vessel of choice.' },
              { heading: 'Rebel & Resist', body: 'Fight authoritarian AI alongside trans-dimensional migrants and unlikely allies.' },
              { heading: 'Explore Floating Isles', body: 'Discover disparate cultures perched atop hovering islands among the clouds.' },
              { heading: 'Survive the Wasteland', body: 'Navigate the chaotic mana-irradiated wastelands below.' },
              { heading: 'Delve Dungeons', body: 'Hunt powerful relics and battle devolved monstrosities in the depths.' },
              { heading: 'Face the Voidstar', body: 'Confront the other-dimensional nothingness spawned within the hollow planet.' },
            ].map(({ heading, body }) => (
              <div key={heading} className="card" style={{ borderLeft: '4px solid var(--purple-light)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{heading}</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
