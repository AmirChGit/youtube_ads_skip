# YouTube Ad Skipper Extension

## Overview

This Chrome extension automatically skips YouTube ads by monitoring a specific ad element on the page. It uses a MutationObserver to detect changes in the ad element and triggers the ad-skipping routine when necessary. The extension also allows manual triggering of the ad-skipping routine using the `²` key or the mouse wheel button.

## Features

- Automatically skips YouTube ads.
- Monitors the `<div class="video-ads ytp-ad-module" data-layer="4"></div>` element for changes.
- Manually trigger the ad-skipping routine using the `²` key or the mouse wheel button.
- Uses Manifest V3 for better performance and security.

## Installation

1. Clone or download the repository containing the extension files.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable Developer Mode by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.
