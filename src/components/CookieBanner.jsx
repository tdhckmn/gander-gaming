import { useState } from 'react';
import { getConsent, isQAMode, acceptAnalytics, declineAnalytics } from '../utils/analytics.js';

export default function CookieBanner() {
  const qa = isQAMode();
  const [visible, setVisible] = useState(() => qa || getConsent() === null);

  if (!visible) return null;

  if (qa) {
    return (
      <div className="cookie-banner cookie-banner-qa" role="status">
        <div className="cookie-banner-inner">
          <div className="cookie-banner-text">
            <strong>QA mode active</strong>
            <p>Analytics are disabled. All events will be logged to the console instead.</p>
          </div>
          <div className="cookie-banner-actions">
            <button className="btn btn-ghost" onClick={() => setVisible(false)}>Dismiss</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <strong>Cookie notice</strong>
          <p>
            We use Google Analytics to understand how visitors use this site — page views and
            button clicks only. No personal data is sold or shared. You can decline and the
            site works exactly the same.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button className="btn btn-purple" onClick={() => { acceptAnalytics(); setVisible(false); }}>Accept</button>
          <button className="btn btn-ghost" onClick={() => { declineAnalytics(); setVisible(false); }}>Decline</button>
        </div>
      </div>
    </div>
  );
}
