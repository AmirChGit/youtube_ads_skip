# youtube_ads_skip
setInterval(()=>{
  const adOverlay = document.querySelector('.ytp-ad-overlay-close-container');
  const skipButton = document.querySelector('.ytp-ad-skip-button');
  if(adOverlay !=undefined)
    adOverlay.click();
  if(skipButton != undefined)
    skipButton.click();
}, 2000);




<div class="ytp-skip-ad" id="skip-ad:1" style=""><div class="ytp-preview-ad" id="preview-ad:2" style="display: none;"><div class="ytp-preview-ad__text">1</div><img class="ytp-preview-ad__image" src="https://i.ytimg.com/vi/vvImHQAW0Fw/mqdefault.jpg"></div><button class="ytp-skip-ad-button" id="skip-button:3" style="opacity: 0.5;"><div class="ytp-skip-ad-button__text">Ignorer</div><span class="ytp-skip-ad-button__icon"><svg height="100%" viewBox="-6 -6 36 36" width="100%"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" fill="#fff"></path></svg></span></button></div>
