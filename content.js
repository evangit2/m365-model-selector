// M365 Model Selector v3.4 — Content script
(function() {
  'use strict';

  let enabled = true, done = false, debug = true, injected = false;

  chrome.storage.local.get(['enabled', 'debug'], r => {
    enabled = r.enabled !== false;
    debug = r.debug !== false;
    if (enabled) inject();
  });
  chrome.storage.onChanged.addListener(c => {
    if (c.enabled !== undefined) {
      enabled = c.enabled.newValue;
      if (enabled) { done = false; injected = false; inject(); }
    }
  });

  function stat(s) { chrome.storage.local.set({ lastStatus: s, lastTime: Date.now() }); }
  function log(s) { if (debug) console.log('[MS cs]', s); }

  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (!event.data || event.data.source !== 'm365-model-selector') return;
    switch (event.data.type) {
      case 'log': console.log('%c[MS main]%c ' + event.data.message, 'color:#6c63ff', ''); break;
      case 'found':
        if (event.data.already || event.data.set) { stat('GPT 5.5 Think Deeper'); done = true; }
        else stat('Found: ' + event.data.message);
        break;
      case 'error': stat('Error: ' + event.data.message); break;
    }
  });

  function inject() {
    if (!enabled || done || injected) return;
    injected = true;

    const old = document.getElementById('ms-model-selector');
    if (old) old.remove();

    const root = document.getElementById('m365-copilot-app-layout-root');
    if (!root) { injected = false; setTimeout(inject, 1000); return; }

    stat('Selecting model...');
    const script = document.createElement('script');
    script.id = 'ms-model-selector';
    script.src = chrome.runtime.getURL('main.js');
    (document.head || document.documentElement).appendChild(script);
  }

  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) { lastUrl = location.href; done = false; injected = false; inject(); }
  }, 1500);

  setTimeout(inject, 2500);
})();
