# M365 Model Selector

Chrome extension that automatically selects **GPT 5.5 Think Deeper** on Microsoft 365 Copilot Chat — every time, no clicks required.

## What it does

Navigates the Fluent UI model selector menu to switch from "Auto" to "GPT 5.5 Think Deeper" when the Copilot Chat page loads or refreshes.

## Installation

### From source (developer mode)

1. Clone this repo or download the ZIP
2. Go to `chrome://extensions`
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked** and select the repo folder
5. Navigate to [M365 Copilot Chat](https://m365.cloud.microsoft/chat)

## Privacy

This extension collects nothing. It runs entirely within your browser and communicates with no external servers. See the [privacy policy](https://evangit2.github.io/m365-model-selector/privacy.html) for details.

## Permissions

| Permission | Why |
|---|---|
| `storage` | Saves your enabled/disabled toggle preference locally |
| Host: `m365.cloud.microsoft` | Required to interact with the model selector on the Copilot Chat page |

## Project structure

```
manifest.json     Extension manifest (v3)
content.js        Injects main.js into the page context
main.js           Runs in the page's main world to click the model selector
popup.html        Extension popup UI (enable/disable, reset)
popup.js          Popup logic
docs/             GitHub Pages landing page and privacy policy
```

## Links

- [GitHub Pages](https://evangit2.github.io/m365-model-selector/)
- [Privacy Policy](https://evangit2.github.io/m365-model-selector/privacy.html)
- [Chrome Web Store](https://chromewebstore.google.com/detail/mmnblofgjnekeknmjaondpcafpcpiflg)
