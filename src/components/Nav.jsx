import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoSrc from '/assets/img/logo-gander-gaming.png';
import StoreModal from './StoreModal';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="nav-logo" onClick={close}>
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
            <li><NavLink to="/" onClick={close}>Home</NavLink></li>
            <li><NavLink to="/grok" onClick={close}>Grok?!</NavLink></li>
            <li><NavLink to="/tools" onClick={close}>Tools</NavLink></li>
            <li className="nav-cta">
              <a href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition" target="_blank" rel="noopener noreferrer" onClick={close}>
                Kickstarter
              </a>
            </li>
            <li className="nav-cta nav-cta-store">
              <button onClick={() => { close(); setStoreOpen(true); }}>Store</button>
            </li>
          </ul>
        </div>
      </nav>

      {storeOpen && <StoreModal onClose={() => setStoreOpen(false)} />}
    </>
  );
}
