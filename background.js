// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "togglePopup") {
      chrome.tabs.executeScript(sender.tab.id, { file: "togglePopup.js" });
    }
  });
  