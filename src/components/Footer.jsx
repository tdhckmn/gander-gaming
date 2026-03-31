import { NavLink } from 'react-router-dom';
import logoSrc from '/assets/img/logo-gander-gaming.png';

export default function Footer() {
  return (
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
          <li>
            <a href="https://www.facebook.com/Lestortoise" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition" target="_blank" rel="noopener noreferrer">
              Kickstarter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
