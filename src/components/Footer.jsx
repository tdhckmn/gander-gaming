import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoSrc from '/assets/img/logo-gander-gaming.png';
import StoreModal from './StoreModal';

export default function Footer() {
  const [storeOpen, setStoreOpen] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={logoSrc} alt="Gander Gaming" />
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Gander Gaming. 100% free-range human-made.
            </p>
          </div>
          <ul className="footer-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/grok">Grok?! 2e</NavLink></li>
            <li><NavLink to="/tools">Tools</NavLink></li>
            <li><button className="footer-store-btn" onClick={() => setStoreOpen(true)}>Store</button></li>
            <li><a href="https://www.facebook.com/Lestortoise" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://bsky.app/profile/gandergaming.bsky.social" target="_blank" rel="noopener noreferrer">Bluesky</a></li>
            <li><a href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition" target="_blank" rel="noopener noreferrer">Kickstarter</a></li>
          </ul>
        </div>
      </footer>

      {storeOpen && <StoreModal onClose={() => setStoreOpen(false)} />}
    </>
  );
}
