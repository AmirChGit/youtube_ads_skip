// content.js
document.addEventListener('keydown', (event) => {
    if (event.key === '²') {
      chrome.runtime.sendMessage({ action: "runAdSkipper" });
    }
  });
  
  document.addEventListener('mousedown', (event) => {
    if (event.button === 1) { // Mouse wheel button
      chrome.runtime.sendMessage({ action: "togglePopup" });
    }
  });
  
