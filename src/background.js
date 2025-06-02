// Background service worker for OrinTabs extension
// Handles grouping of tabs. Currently groups by domain as a placeholder for
// more advanced LLM-based grouping.

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'groupTabs') {
    groupTabsByDomain();
    sendResponse({status: 'ok'});
  } else if (request.action === 'summarizeAndGroup') {
    summarizeAndGroupActiveTab();
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


async function getConfig() {
  return new Promise(resolve => {
    chrome.storage.local.get(['apiKey', 'apiUrl'], (result) => {
      resolve({
        apiKey: result.apiKey || '',
        apiUrl: result.apiUrl || 'https://api.openai.com/v1/chat/completions'
      });
    });
  });
}

// Summarize the active tab's content using an LLM and group the tab by summary.
async function summarizeAndGroupActiveTab() {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  if (!tab || !tab.id) return;

  try {
    const [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => document.body.innerText.slice(0, 2000)
    });
    const summary = await summarizeText(result);
    if (!summary) return;

    const groups = await chrome.tabGroups.query({});
    let existingGroup = groups.find(g => g.title === summary);
    let groupId;
    if (existingGroup) {
      groupId = existingGroup.id;
      await chrome.tabs.group({groupId, tabIds: [tab.id]});
    } else {
      groupId = await chrome.tabs.group({tabIds: [tab.id]});
      await chrome.tabGroups.update(groupId, {title: summary, color: 'green'});
    }
  } catch (e) {
    console.error('Failed to summarize and group tab:', e);
  }
}

async function summarizeText(text) {
  const { apiKey, apiUrl } = await getConfig();
  if (!apiKey) {
    console.error('LLM API key not configured');
    return null;
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: `Summarize the following text in one short sentence: ${text}`}],
      max_tokens: 60
    })
  });

  const data = await response.json();
  return data.choices && data.choices[0] && data.choices[0].message.content.trim();
}
