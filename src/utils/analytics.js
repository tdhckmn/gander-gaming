const GA_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
const QA_KEY = 'grok-qa';
const CONSENT_KEY = 'grok-cookie-consent';
const UTM_SESSION_KEY = 'grok-utms';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

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

// ── UTM capture ───────────────────────────────────────────────────────────────
// Called once on app boot. Reads UTM params from the landing URL and stores
// them in sessionStorage so they survive SPA navigation within the session.
export function captureUTMParams() {
  const params = new URLSearchParams(window.location.search);
  const utms = {};
  UTM_KEYS.forEach(key => {
    if (params.get(key)) utms[key] = params.get(key);
  });
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(utms));
  }
}

export function getStoredUTMs() {
  try { return JSON.parse(sessionStorage.getItem(UTM_SESSION_KEY) || '{}'); }
  catch { return {}; }
}

function utmSearchFromSession() {
  const utms = getStoredUTMs();
  if (!Object.keys(utms).length) return '';
  return '?' + new URLSearchParams(utms).toString();
}

// Call on app boot — only loads GA if consent was previously accepted.
export function initAnalytics() {
  detectQAMode();
  captureUTMParams();
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
export function trackPageView(path, search = '') {
  const fullUrl = `https://gandergaming.com${path}${search || utmSearchFromSession()}`;
  if (isQAMode()) {
    console.log('[QA Analytics] page_view', { page_path: path, page_location: fullUrl });
    return;
  }
  if (!initialized) return;
  window.gtag('event', 'page_view', { page_path: path, page_location: fullUrl });
}

export function trackEvent(name, params = {}) {
  if (isQAMode()) {
    console.log(`[QA Analytics] ${name}`, params);
    return;
  }
  if (!initialized) return;
  window.gtag('event', name, params);
}
