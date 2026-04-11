import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroSrc from '/assets/img/hero-gander-gaming.png';

export default function Home() {
  const heroImgRef = useRef(null);
  const pageBodyRef = useRef(null);

  useEffect(() => {
    const heroImg = heroImgRef.current;
    const pageBody = pageBodyRef.current;
    if (!heroImg || !pageBody) return;

    const heroHeight = heroImg.parentElement?.offsetHeight ?? window.innerHeight;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Parallax: image drifts up at 30% of scroll speed
      heroImg.style.transform = `translateY(-${scrollY * 0.3}px)`;

      // Page body slides up as hero scrolls away
      const progress = Math.max(0, Math.min(1, scrollY / (heroHeight * 0.65)));
      pageBody.style.transform = `translateY(${(1 - progress) * 60}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="hero">
        <img ref={heroImgRef} src={heroSrc} alt="Gander Gaming" className="hero-img" />
        <div className="hero-socials">
          <a href="https://www.facebook.com/Lestortoise" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="Kickstarter">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 13.5l-3-4v4H8V8.5h2v4l3-4h2.5l-3.5 4.5 3.5 4.5H13z"/>
            </svg>
          </a>
          <a href="https://bsky.app/profile/gandergaming.bsky.social" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="Bluesky">
            <svg viewBox="0 0 360 320" fill="currentColor" width="22" height="22">
              <path d="M180 142c-16.3-31.7-60.7-90.8-102-120C38 2 14.3 5.1 6 15 0 23.1 0 39.6 0 55.6 0 96.5 21.5 162 47.7 162H48c-26.5 0-46.9 37.6-46.9 70.5C1.1 266.8 19.8 295 60 295c41 0 67.7-24.9 107.9-124.5 3.6-8.7 7.1-18 10.6-27.5 3.5 9.5 7 18.8 10.6 27.5C229.3 270.1 256 295 297 295c40.2 0 58.9-28.2 58.9-62.5 0-32.9-20.4-70.5-46.9-70.5h.3C335.5 162 357 96.5 357 55.6c0-16 0-32.5-6-40.6-8.3-9.9-32-13-72-7C236.7 51.2 196.3 110.3 180 142z"/>
            </svg>
          </a>
        </div>
        <div className="hero-overlay" />
      </div>

      <div className="page-body" ref={pageBodyRef}>
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
                  fontFamily: 'var(--font-ink)',
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
                    Now on Kickstarter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container text-center">
            <h2>Try the Tools</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 2rem' }}>
              Generate characters, scenes, NPCs, and assets for your Grok?! sessions — right in your browser.
            </p>
            <Link to="/tools" className="btn btn-primary btn-lg">Open the Toolbox</Link>
          </div>
        </section>
      </div>
    </>
  );
}
