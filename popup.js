// Popup script for M365 Model Selector

document.addEventListener('DOMContentLoaded', () => {
  const enabledToggle = document.getElementById('enabled');
  const modelInput = document.getElementById('modelName');
  const debugToggle = document.getElementById('debug');
  const statusEl = document.getElementById('status');

  // Load saved settings
  chrome.storage.local.get(['enabled', 'modelName', 'debug', 'lastStatus', 'lastTime'], (result) => {
    enabledToggle.checked = result.enabled !== false;
    modelInput.value = result.modelName || 'GPT 5.5 Think Deeper';
    debugToggle.checked = result.debug || false;

    if (result.lastStatus) {
      const time = result.lastTime ? new Date(result.lastTime).toLocaleTimeString() : '';
      statusEl.textContent = `${result.lastStatus} ${time ? `(${time})` : ''}`;
      statusEl.className = result.lastStatus.startsWith('✅') ? 'status success' : 'status warning';
    } else {
      statusEl.textContent = 'Ready — open Chat page to use';
    }
  });

  // Save on change
  enabledToggle.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: enabledToggle.checked });
  });

  modelInput.addEventListener('input', () => {
    chrome.storage.local.set({ modelName: modelInput.value });
  });

  debugToggle.addEventListener('change', () => {
    chrome.storage.local.set({ debug: debugToggle.checked });
  });

  // Listen for status updates
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.lastStatus) {
      const status = changes.lastStatus.newValue;
      statusEl.textContent = status;
      statusEl.className = status.startsWith('✅') ? 'status success' : 'status warning';
    }
  });

  // Reset button — clear storage and reload
  document.getElementById('reset').addEventListener('click', () => {
    chrome.storage.local.set({ modelName: 'GPT 5.5 Think Deeper', enabled: true, debug: false }, () => {
      window.close();
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});
