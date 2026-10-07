console.log("Short-form Blocker loaded");

function hideShortsMenu() {
  // 축소형 sidebar
  const miniShorts = document.querySelector(
    'ytd-mini-guide-entry-renderer a[href="/shorts/"]',
  );

  if (miniShorts) {
    miniShorts
      .closest("ytd-mini-guide-entry-renderer")
      ?.style.setProperty("display", "none");
  }

  // 확장형 sidebar
  const guideShorts = document.querySelector(
    'ytd-guide-entry-renderer a[title="Shorts"]',
  );

  if (guideShorts) {
    guideShorts
      .closest("ytd-guide-entry-renderer")
      ?.style.setProperty("display", "none");
  }
}

function hideShortsShelves() {
  const shortsShelves = document.querySelectorAll(
    "ytd-rich-shelf-renderer[is-shorts]",
  );

  shortsShelves.forEach((shelf) => {
    shelf.style.display = "none";
  });
}

function hideSearchShorts() {
  const shortsShelves = document.querySelectorAll(
    'grid-shelf-view-model:has(a[href^="/shorts/"])',
  );

  shortsShelves.forEach((shelf) => {
    shelf.style.display = "none";
  });
}

function hideShortsFilter() {
  const chips = document.querySelectorAll("yt-chip-cloud-chip-renderer");

  chips.forEach((chip) => {
    if (chip.textContent.trim() === "Shorts") {
      chip.style.display = "none";
    }
  });
}

function hideShortsSearchFilter() {
    const shortsFilter = document.querySelector(
        'ytd-search-filter-renderer:has([title^="Shorts"])'
    );

    if (shortsFilter) {
        shortsFilter.style.display = "none";
    }
}

hideShortsMenu();
hideShortsShelves();
hideSearchShorts();
hideShortsFilter();
hideShortsSearchFilter();

const observer = new MutationObserver(() => {
    hideShortsMenu();
    hideShortsShelves();
    hideSearchShorts();
    hideShortsFilter();
    hideShortsSearchFilter();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
