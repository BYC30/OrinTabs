// Background service worker for OrinTabs extension
// Handles grouping of tabs. Currently groups by domain as a placeholder for
// more advanced LLM-based grouping.

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'groupTabs') {
    groupTabsByDomain();
    sendResponse({status: 'ok'});
  }
});

async function groupTabsByDomain() {
  const tabs = await chrome.tabs.query({currentWindow: true});
  const groups = {};

  // Organize tabs by their domain
  for (const tab of tabs) {
    if (!tab.url) continue;
    try {
      const url = new URL(tab.url);
      const domain = url.hostname;
      if (!groups[domain]) groups[domain] = [];
      groups[domain].push(tab.id);
    } catch (e) {
      // ignore invalid URLs (such as chrome://)
    }
  }

  for (const [domain, tabIds] of Object.entries(groups)) {
    if (tabIds.length < 2) continue; // Only group if more than one tab for domain
    const groupId = await chrome.tabs.group({tabIds});
    await chrome.tabGroups.update(groupId, {
      title: domain,
      color: 'blue'
    });
  }
}
