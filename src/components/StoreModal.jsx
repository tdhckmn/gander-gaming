import { useEffect } from 'react';
import { trackEvent } from '../utils/analytics.js';

const STOREFRONTS = [
  {
    name: 'DriveThruRPG',
    description: 'PDFs & digital editions',
    href: 'https://www.drivethrurpg.com/en/publisher/18836/gander-gaming',
    label: 'drivethrurpg',
  },
  {
    name: 'itch.io',
    description: 'Pay-what-you-want & bundles',
    href: 'https://gander-gaming.itch.io',
    label: 'itchio',
  },
];

export default function StoreModal({ onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Store">
        <div className="modal-header">
          <h2 className="modal-title">Shop Gander Gaming</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <p className="modal-subtitle">Pick your preferred storefront.</p>
        <div className="modal-stores">
          {STOREFRONTS.map(({ name, description, href, label }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="store-card"
              onClick={() => { trackEvent('click_store', { label }); onClose(); }}
            >
              <span className="store-name">{name}</span>
              <span className="store-desc">{description}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
