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
  }, 1000); // Check every second for the skip ad button

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

// Automatically run skipAd if an ad is detected
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && (
            node.matches('.video-ads .ytp-ad-module') || 
            node.matches('.video-ads.ytp-ad-module') || 
            node.matches('.ytp-ad-button-vm.ytp-ad-component--clickable ytp-ad-button--style-filled.ytp-ad-button--size-default') || 
            node.matches('.ytp-ad-button__text') || 
            node.matches('.ytp-ad-player-overlay-layout__ad-info-container') || 
            node.matches('.ytp-ad-player-overlay-layout') || 
            node.matches('.ytp-ad-player-overlay-layout__player-card-container') || 
            node.matches('.ytp-ad-simple-ad-badge') || 
            node.matches('.ytp-ad-avatar-lockup-card__avatar_and_text_container') || 
            node.matches('.ytp-ad-avatar-lockup-card__text_container') || 
            node.matches('.ytp-ad-player-overlay-layout__ad-info-container') || 
            node.matches('.ytp-ad-duration-remaining') || 
            node.matches('.ytp-ad-player-overlay-layout__skip-or-preview-container') || 
            node.matches('.ytp-ad-hover-text-container.ytp-ad-info-hover-text-short') || 
            node.matches('.ytp-ad-text') || 
            node.matches('.ytp-visit-advertiser-link.ytp-ad-component--clickable') || 
            node.matches('.ytp-ad-player-overlay-layout__skip-or-preview-container') || 
            node.matches('.ytp-preview-ad') || 
            node.matches('.ytp-preview-ad__text') || 
            node.matches('.ytp-ad-player-overlay-layout__ad-disclosure-banner-container'))) {
          skipAd();
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

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
