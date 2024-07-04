// adSkipper.js
function skipAd() {
    const video = document.querySelector('video');
    if (!video) return;
  
    const intervalId = setInterval(() => {
      const skipButton = document.querySelector('.ytp-ad-skip-button, button[id^="skip-button"]');
  
      if (skipButton) {
        skipButton.click();
        clearInterval(intervalId);
        video.play();
  
        // Exit Picture-in-Picture if active
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        }
      }
    }, 500); // Check every 500ms for the skip button
  
    // Request Picture-in-Picture and skip to the end
    if (!document.pictureInPictureElement) {
      video.requestPictureInPicture().then(() => {
        setTimeout(() => {
          video.currentTime = video.duration;
          document.exitPictureInPicture();
        }, 500);
      }).catch(error => {
        console.error('Error entering Picture-in-Picture mode:', error);
      });
    }
  }
  
  // Run the skipAd function once
  skipAd();
  