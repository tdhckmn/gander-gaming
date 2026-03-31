import { NavLink } from 'react-router-dom';
import logoSrc from '/assets/img/logo-gander-gaming.png';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">
          <img src={logoSrc} alt="Gander Gaming" />
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/grok">Grok?!</NavLink></li>
          <li><NavLink to="/tools">Tools</NavLink></li>
          <li className="nav-cta">
            <a href="https://www.kickstarter.com/projects/gandergaming/grok-2nd-edition" target="_blank" rel="noopener noreferrer">
              Kickstarter
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
