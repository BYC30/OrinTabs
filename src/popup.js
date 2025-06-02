document.getElementById('group-btn').addEventListener('click', () => {
  chrome.runtime.sendMessage({action: 'groupTabs'}, (response) => {
    window.close();
  });
});
