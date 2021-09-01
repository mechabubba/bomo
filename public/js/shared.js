const initialize = async function() {
    window.dispatchEvent(new CustomEvent("appReady", {
        detail: {},
    }));
};

// initialize();
document.addEventListener("DOMContentLoaded", initialize);
