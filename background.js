// Listen for the extension button click
chrome.action.onClicked.addListener(() => {
  // Query the currently active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      // Execute the script to clear cache on the current tab
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: clearCache,
      });
    } else {
      console.error("No active tab found.");
    }
  });
});

// Function to clear cache
function clearCache() {
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    alert("Cache Cleared!");
  } else {
    alert("Cache API not supported in this browser.");
  }
}
