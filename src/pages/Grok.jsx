import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroSrc          from '/assets/img/hero-grok.png';
import monsterCastleSrc from '/assets/img/grok2e-monster-castle.png';
import { trackEvent } from '../utils/analytics.js';
import { useSEO } from '../hooks/useSEO.js';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Game',
  name: 'Grok?! 2nd Edition',
  description: 'A rules-light science fantasy RPG set in a post-apocalyptic world of advanced technomancy and boundless plausibility. 200-page full-color hardcover.',
  url: 'https://gandergaming.com/grok',
  publisher: { '@type': 'Organization', name: 'Gander Gaming', url: 'https://gandergaming.com' },
  numberOfPages: 200,
  bookFormat: 'Hardcover',
  genre: ['Science Fantasy', 'Tabletop RPG'],
  offers: [
    { '@type': 'Offer', url: 'https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition', name: 'Kickstarter' },
    { '@type': 'Offer', url: 'https://www.drivethrurpg.com/en/publisher/18836/gander-gaming', name: 'DriveThruRPG' },
    { '@type': 'Offer', url: 'https://gander-gaming.itch.io', name: 'itch.io' },
  ],
};

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


export default function Grok() {
  const heroImgRef = useRef(null);
  const pageBodyRef = useRef(null);

  useSEO({
    title: 'Grok?! 2nd Edition — Gander Gaming',
    description: 'A rules-light science fantasy RPG set in a post-apocalyptic world of advanced technomancy and boundless plausibility. 200-page full-color hardcover.',
    canonical: 'https://gandergaming.com/grok',
    image: 'https://gandergaming.com/assets/img/share-grok.png',
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    const heroImg = heroImgRef.current;
    const pageBody = pageBodyRef.current;
    if (!heroImg || !pageBody) return;

    const heroHeight = heroImg.parentElement?.offsetHeight ?? window.innerHeight;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      heroImg.style.transform = `translateY(-${scrollY * 0.3}px)`;
      const progress = Math.max(0, Math.min(1, scrollY / (heroHeight * 0.65)));
      pageBody.style.transform = `translateY(${(1 - progress) * 60}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="grok-hero">
        <div className="hero-orb grok-orb-1" aria-hidden="true" />
        <div className="hero-orb grok-orb-2" aria-hidden="true" />
        <div className="hero-orb grok-orb-3" aria-hidden="true" />
        <img ref={heroImgRef} className="grok-hero-img" src={heroSrc} alt="Grok?! 2nd Edition" style={{ position: 'relative', zIndex: 1 }} />
        <div className="grok-hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <p>A science-fantasy RPG of post-apocalyptic technomancy and boundless plausibility.</p>
        </div>
      </div>

      <div className="page-body" ref={pageBodyRef}>
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
          <img src={monsterCastleSrc} alt="A devolved monstrosity looms before a crumbling fortress on Planet Grok" className="panel-img" style={{ marginBottom: '2.5rem' }} />
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ marginBottom: '1rem' }}>About the Game</h2>
              <p>
                Grok?! is a <strong>rules-light science fantasy RPG</strong> set in a post-apocalyptic world
                of advanced technomancy and boundless plausibility. Nearly anything is plausible.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                The 2nd Edition is a <strong>200-page full-color hardcover</strong>, complete with everything
                you need to explore, survive, and thrive on Planet Grok.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Grok?! is 100% made by free-range humans.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                <a
                  href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-purple btn-lg"
                  onClick={() => trackEvent('click_cta', { label: 'kickstarter', source: 'grok' })}
                >
                  Now on Kickstarter
                </a>
                <Link to="/tools" className="btn btn-outline btn-lg" onClick={() => trackEvent('click_cta', { label: 'try_tools', source: 'grok' })}>
                  Try the Tools
                </Link>
              </div>
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
      </div>
    </>
  );
}
