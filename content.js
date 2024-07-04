// content.js
document.addEventListener('keydown', (event) => {
    if (event.key === '²') {
      chrome.runtime.sendMessage({ action: "runAdSkipper" });
    }
  });
  