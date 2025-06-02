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

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['apiKey', 'apiUrl', 'model', 'prompt'], (result) => {
    document.getElementById('api-key').value = result.apiKey || '';
    document.getElementById('api-url').value = result.apiUrl || 'https://api.openai.com/v1/chat/completions';
    document.getElementById('model').value = result.model || 'gpt-3.5-turbo';
    document.getElementById('prompt').value = result.prompt || 'Summarize the following text in one short sentence:';
  });
});

document.getElementById('save-config-btn').addEventListener('click', () => {
  const apiKey = document.getElementById('api-key').value;
  const apiUrl = document.getElementById('api-url').value;
  const model = document.getElementById('model').value;
  const prompt = document.getElementById('prompt').value;
  chrome.storage.local.set({apiKey, apiUrl, model, prompt}, () => {
    window.close();
  });
});
