import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { resetToTop } from './lib/lenis'
import './index.css'

// Every visit — first load, reload, or coming back later — starts on the hero.
//  - stop the browser restoring the old scroll position
//  - drop any #section from the address so it can't jump past the hero
//  - scroll to the top as the page unloads, for browsers that restore regardless
//  - and again if the page comes back from the back/forward cache still scrolled down
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search)
window.scrollTo(0, 0)
window.addEventListener('beforeunload', () => window.scrollTo(0, 0))
window.addEventListener('pageshow', (e) => {
  if (e.persisted) resetToTop()
})

// StrictMode is intentionally omitted: it double-mounts effects in development, which duplicates
// pinned ScrollTriggers and the preloader timeline.
createRoot(document.getElementById("root")!).render(<App />);
