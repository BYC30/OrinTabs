document.getElementById('group-btn').addEventListener('click', () => {
  chrome.runtime.sendMessage({action: 'groupTabs'}, (response) => {
    window.close();
  });
});

document.getElementById('summarize-btn').addEventListener('click', () => {
  chrome.runtime.sendMessage({action: 'summarizeAndGroup'}, () => {
    window.close();
  });
});

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
}

function updateStats() {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    chrome.tabGroups.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (groups) => {
      const statsEl = document.getElementById('stats');
      statsEl.textContent = `Tabs: ${tabs.length}, Groups: ${groups.length}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['apiKey', 'apiUrl', 'theme'], (result) => {
    document.getElementById('api-key').value = result.apiKey || '';
    document.getElementById('api-url').value = result.apiUrl || 'https://api.openai.com/v1/chat/completions';
    applyTheme(result.theme || 'light');
    updateStats();
  });
});

document.getElementById('save-config-btn').addEventListener('click', () => {
  const apiKey = document.getElementById('api-key').value;
  const apiUrl = document.getElementById('api-url').value;
  chrome.storage.local.set({apiKey, apiUrl}, () => {
    window.close();
  });
});

document.getElementById('toggle-theme-btn').addEventListener('click', () => {
  chrome.storage.local.get('theme', ({theme}) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    chrome.storage.local.set({theme: newTheme}, () => applyTheme(newTheme));
  });
});
