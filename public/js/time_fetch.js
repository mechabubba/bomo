addEventListener("DOMContentLoaded", async function(event) {
    const response = await fetch("/time");
    const json = await response.json();
    console.log("fetch", json);
    document.querySelector("#timeFetch").textContent = json.content;
});
