import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoSrc from '/assets/img/logo-gander-gaming.png';
import StoreModal from './StoreModal';
import { trackEvent } from '../utils/analytics.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const close = () => setOpen(false);

  function openStore() {
    close();
    setStoreOpen(true);
    trackEvent('open_store_modal', { source: 'nav' });
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="nav-logo" onClick={() => { close(); trackEvent('click_nav', { label: 'logo' }); }}>
            <img src={logoSrc} alt="Gander Gaming" />
          </NavLink>

          <button
            className="nav-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`nav-links${open ? ' nav-links-open' : ''}`}>
            <li><NavLink to="/" onClick={() => { close(); trackEvent('click_nav', { label: 'home' }); }}>Home</NavLink></li>
            <li><NavLink to="/grok" onClick={() => { close(); trackEvent('click_nav', { label: 'grok' }); }}>Grok?!</NavLink></li>
            <li><NavLink to="/tools" onClick={() => { close(); trackEvent('click_nav', { label: 'tools' }); }}>Tools</NavLink></li>
            <li className="nav-cta">
              <a
                href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { close(); trackEvent('click_nav', { label: 'kickstarter' }); }}
              >
                Kickstarter
              </a>
            </li>
            <li className="nav-cta nav-cta-store">
              <button onClick={openStore}>Store</button>
            </li>
          </ul>
        </div>
      </nav>

      {storeOpen && <StoreModal onClose={() => setStoreOpen(false)} />}
    </>
  );
}
