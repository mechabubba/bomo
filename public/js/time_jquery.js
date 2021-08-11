addEventListener("DOMContentLoaded", async function(event) {
    const json = await $.ajax({
        type: "GET",
        url: "/time",
    });
    console.log("jquery ajax", json);
    document.querySelector("#timejQuery").textContent = json.content;
});
