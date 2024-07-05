// adSkipper.js
function skipAd() {
  const video = document.querySelector('video');
  if (!video) return;

  const checkForSkipButton = () => {
    const skipAdDiv = document.querySelector('.ytp-ad-player-overlay-slot .ytp-skip-ad');
    if (skipAdDiv && skipAdDiv.children.length > 1) {
      const skipButton = skipAdDiv.children[1];
      if (skipButton && skipButton.classList.contains('ytp-skip-ad-button')) {
        skipButton.click();
        video.play();
      }
    }

    // Check for the final skip button after exiting Picture-in-Picture mode
    const finalSkipButton = document.querySelector('.ytp-ad-skip-button-modern.ytp-button');
    if (finalSkipButton) {
      finalSkipButton.click();
      video.play();
    }
  };

  const intervalId = setInterval(() => {
    checkForSkipButton();
  }, 100); // Check every second for the skip ad button

  // Request Picture-in-Picture and skip to the end
  if (!document.pictureInPictureElement) {
    video.requestPictureInPicture().then(() => {
      setTimeout(() => {
        video.currentTime = video.duration;
        document.exitPictureInPicture().then(() => {
          checkForSkipButton();
        }).catch(error => {
          console.error('Error exiting Picture-in-Picture mode:', error);
        });
      }, 500);
    }).catch(error => {
      console.error('Error entering Picture-in-Picture mode:', error);
    });
  }
}

// Function to observe the specific ad div and check for changes
function observeAdDiv() {
  const targetNode = document.querySelector('.video-ads.ytp-ad-module[data-layer="4"]');
  if (!targetNode) return;

  const config = { childList: true, subtree: true };

  const callback = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        skipAd();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

// Listen for key press and mouse wheel button press
document.addEventListener('keydown', (event) => {
  if (event.key === '²') {
    skipAd();
  }
});

document.addEventListener('mousedown', (event) => {
  if (event.button === 1) { // Mouse wheel button
    skipAd();
  }
});

// Start observing the ad div when the script loads
observeAdDiv();

// Re-observe the ad div periodically to handle cases where the ad div might be dynamically replaced
setInterval(observeAdDiv, 100);
