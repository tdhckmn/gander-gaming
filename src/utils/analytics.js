const GA_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
const QA_KEY = 'grok-qa';
const CONSENT_KEY = 'grok-cookie-consent';

// ── QA mode ──────────────────────────────────────────────────────────────────
// Called once on app boot. Detects ?qa=true and persists to localStorage.
export function detectQAMode() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('qa') === 'true') {
    localStorage.setItem(QA_KEY, 'true');
  }
}

export function isQAMode() {
  return localStorage.getItem(QA_KEY) === 'true';
}

// ── Consent ───────────────────────────────────────────────────────────────────
export function getConsent() {
  return localStorage.getItem(CONSENT_KEY); // 'accepted' | 'declined' | null
}

function saveConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
}

// ── GA initialisation ─────────────────────────────────────────────────────────
let initialized = false;

function loadGA() {
  if (initialized || !GA_ID) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

// Call on app boot — only loads GA if consent was previously accepted.
export function initAnalytics() {
  detectQAMode();
  if (!isQAMode() && getConsent() === 'accepted') {
    loadGA();
  }
}

// Called by CookieBanner when user clicks Accept.
export function acceptAnalytics() {
  saveConsent('accepted');
  loadGA();
}

// Called by CookieBanner when user clicks Decline.
export function declineAnalytics() {
  saveConsent('declined');
}

// ── Tracking helpers ──────────────────────────────────────────────────────────
export function trackPageView(path) {
  if (isQAMode()) {
    console.log('[QA Analytics] page_view', { page_path: path });
    return;
  }
  if (!initialized) return;
  window.gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(name, params = {}) {
  if (isQAMode()) {
    console.log(`[QA Analytics] ${name}`, params);
    return;
  }
  if (!initialized) return;
  window.gtag('event', name, params);
}
