const initialize = async function() {
    document.dispatchEvent(new CustomEvent("appReady", {
        detail: {},
    }));
};

// initialize();
document.addEventListener("DOMContentLoaded", initialize);
