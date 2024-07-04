// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "runAdSkipper") {
      chrome.tabs.executeScript(sender.tab.id, { file: "adSkipper.js" });
    }
  });
  