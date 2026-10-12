const DEFAULT_SETTINGS = {
  sidebar: true,
  home: true,
  search: true,
  subscription: false,
  filter: true
};

// 저장된 설정 불러오기
chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  for (const key in settings) {
    const toggle = document.getElementById(key);

    if (toggle) {
      toggle.checked = settings[key];
    }
  }
});

// 스위치 변경 시 설정 저장
document.querySelectorAll('input[type="checkbox"]').forEach((toggle) => {
  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({
      [toggle.id]: toggle.checked
    });
  });
});