// togglePopup.js
(async () => {
    let video = document.querySelector('video');
    if (!document.pictureInPictureElement) {
      try {
        await video.requestPictureInPicture();
        // Wait a short moment to ensure Picture-in-Picture mode is activated
        setTimeout(async () => {
          // Skip the video to the end
          video.currentTime = video.duration;
  
          
            // Exit Picture-in-Picture mode
            await document.exitPictureInPicture();
  
            // Check for the 'Skip Ad' button after returning to normal mode
            const intervalId = setInterval(() => {
              const skipButton = document.querySelector('.ytp-skip-ad-button');
              if (skipButton) {
                skipButton.click();
                clearInterval(intervalId);
  
                // Play the main video
                video.play();
  
                // Exit Picture-in-Picture mode if it was activated again
                if (document.pictureInPictureElement) {
                  document.exitPictureInPicture();
                }
              }
            }, 500); // Check every 500ms for the skip button
          
        }, 500);
      } catch (error) {
        console.error('Failed to enter Picture-in-Picture mode:', error);
      }
    } else {
      document.exitPictureInPicture();
    }
  })();
  