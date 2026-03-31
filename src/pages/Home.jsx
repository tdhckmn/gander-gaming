import { Link } from 'react-router-dom';
import heroSrc from '/assets/img/hero-gander-gaming.png';

export default function Home() {
  return (
    <>
      <div className="hero">
        <img className="hero-img" src={heroSrc} alt="Gander Gaming" />
        <div className="hero-overlay" />
      </div>

      <section className="section">
        <div className="container">
          <span className="tag tag-orange" style={{ marginBottom: '1rem', display: 'inline-block' }}>Indie Game Publishing</span>
          <h1>What is Gander Gaming?!</h1>
          <p style={{ maxWidth: '680px', fontSize: '1.15rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Gander Gaming is an indie game publishing company founded by Lester Burton in 2021.
          </p>

          <div className="divider" />

          <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
            <div>
              <blockquote style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                lineHeight: 1.7,
                color: 'var(--text)',
                borderLeft: '4px solid var(--orange)',
                paddingLeft: '1.5rem',
                margin: '0 0 2rem 0',
              }}>
                "Since my first commercial release of the now platinum bestseller Grok?!, I've been committed
                to creating inspiring games, tools, and adventures, to help bring the imagined world in your
                head to the gaming table."
              </blockquote>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>— Lester Burton, Founder</p>
            </div>

            <div className="card card-raised">
              <span className="tag tag-purple" style={{ marginBottom: '1rem', display: 'inline-block' }}>Flagship Title</span>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Grok?! 2nd Edition</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                A rules-light science fantasy RPG set in a post-apocalyptic world of advanced technomancy and
                boundless plausibility. 200 pages, full color, hardcover.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/grok" className="btn btn-purple">Learn More</Link>
                <a
                  href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Back on Kickstarter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 style={{ marginBottom: '0.5rem' }}>What We Make</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: 560 }}>
            Games, tools, and adventures for the table — designed to inspire and built to play.
          </p>
          <div className="grid-3">
            {[
              { icon: '🎲', label: 'Games', body: 'Full RPG systems and supplements that spark imagination and reward creativity at the table.' },
              { icon: '⚙️', label: 'Tools', body: 'Random generators and in-game utilities to keep sessions moving and surprising.' },
              { icon: '🗺️', label: 'Adventures', body: 'Ready-to-run scenarios packed with plausible weirdness and memorable moments.' },
            ].map(({ icon, label, body }) => (
              <div key={label} className="card">
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{label}</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <h2>Try the Tools</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 2rem' }}>
            Generate characters, scenes, NPCs, and assets for your Grok?! sessions — right in your browser.
          </p>
          <Link to="/tools" className="btn btn-primary btn-lg">Open the Toolbox</Link>
        </div>
      </section>
    </>
  );
}
