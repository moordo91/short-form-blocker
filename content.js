console.log("Short-form Blocker loaded");

// 기본 설정
const DEFAULT_SETTINGS = {
  sidebar: true,
  home: true,
  search: true,
  subscription: false,
  filter: true,
};

let settings = { ...DEFAULT_SETTINGS };

// 요소 숨김 및 복구
function setVisibility(elements, hide) {
  elements.forEach((element) => {
    if (hide) {
      // 원래 display 값을 저장
      if (!element.hasAttribute("data-sfb-display")) {
        element.setAttribute(
          "data-sfb-display",
          element.style.getPropertyValue("display"),
        );
        element.setAttribute(
          "data-sfb-priority",
          element.style.getPropertyPriority("display"),
        );
      }

      element.style.setProperty("display", "none", "important");
    } else {
      // 확장 프로그램이 숨긴 요소만 복구
      if (element.hasAttribute("data-sfb-display")) {
        const original = element.getAttribute("data-sfb-display");
        const priority = element.getAttribute("data-sfb-priority");

        if (original) {
          element.style.setProperty("display", original, priority || "");
        } else {
          element.style.removeProperty("display");
        }

        element.removeAttribute("data-sfb-display");
        element.removeAttribute("data-sfb-priority");
      }
    }
  });
}

// 사이드바 Shorts
function hideShortsMenu() {
  const miniShorts = document.querySelectorAll(
    'ytd-mini-guide-entry-renderer:has(a[href="/shorts/"])',
  );

  const guideShorts = document.querySelectorAll(
    'ytd-guide-entry-renderer:has(a[title="Shorts"])',
  );

  setVisibility(miniShorts, settings.sidebar);
  setVisibility(guideShorts, settings.sidebar);
}

// 홈 Shorts
function hideShortsShelves() {
  const shortsShelves = document.querySelectorAll(
    "ytd-rich-shelf-renderer[is-shorts]",
  );

  setVisibility(shortsShelves, settings.home);
}

// 검색 결과 Shorts
function hideSearchShorts() {
  const shortsShelves = document.querySelectorAll(
    'grid-shelf-view-model:has(a[href^="/shorts/"])',
  );

  setVisibility(shortsShelves, settings.search);
}

// Shorts 필터 칩
function hideShortsFilter() {
  const chips = document.querySelectorAll("yt-chip-cloud-chip-renderer");

  const shortsChips = Array.from(chips).filter(
    (chip) => chip.textContent.trim() === "Shorts",
  );

  setVisibility(shortsChips, settings.filter);
}

// 검색 필터 메뉴
function hideShortsSearchFilter() {
  const shortsFilters = document.querySelectorAll(
    'ytd-search-filter-renderer:has([title^="Shorts"])',
  );

  setVisibility(shortsFilters, settings.filter);
}

// 구독 페이지 메뉴
function hideSubscriptionShorts() {
  // 구독 페이지 Shorts 묶음
  const shortsShelves = document.querySelectorAll(
    "ytd-item-section-renderer:has(ytd-reel-shelf-renderer)"
  );

  setVisibility(shortsShelves, settings.subscription);

  // Shorts 탭
  const shortsTabs = document.querySelectorAll(
    'yt-tab-shape[tab-title="Shorts"]'
  );

  setVisibility(shortsTabs, settings.subscription);
}

// 모든 차단 기능 실행
function applySettings() {
  hideShortsMenu();
  hideShortsShelves();
  hideSearchShorts();
  hideShortsFilter();
  hideShortsSearchFilter();
  hideSubscriptionShorts();
}

// 저장된 설정 불러오기
chrome.storage.sync.get(DEFAULT_SETTINGS, (savedSettings) => {
  settings = savedSettings;
  applySettings();
});

// 설정 변경 감지
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") return;

  for (const key in changes) {
    if (key in DEFAULT_SETTINGS) {
      settings[key] = changes[key].newValue ?? DEFAULT_SETTINGS[key];
    }
  }

  applySettings();
});

// DOM 변경 감지
const observer = new MutationObserver(() => {
  applySettings();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
