console.log("Short-form Blocker loaded");

function hideShortsMenu() {
    // 축소형 sidebar
    const miniShorts = document.querySelector(
        'ytd-mini-guide-entry-renderer a[href="/shorts/"]'
    );

    if (miniShorts) {
        miniShorts
            .closest("ytd-mini-guide-entry-renderer")
            ?.style.setProperty("display", "none");
    }

    // 확장형 sidebar
    const guideShorts = document.querySelector(
        'ytd-guide-entry-renderer a[title="Shorts"]'
    );

    if (guideShorts) {
        guideShorts
            .closest("ytd-guide-entry-renderer")
            ?.style.setProperty("display", "none");
    }
}

hideShortsMenu();

const observer = new MutationObserver(() => {
    hideShortsMenu();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});