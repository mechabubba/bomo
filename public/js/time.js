addEventListener("DOMContentLoaded", async function(event) {
    const response = await fetch("/time");
    const json = await response.json();
    console.log("fetch GET /time", json);
    document.querySelector("#timeGet").textContent = json.content;
});
addEventListener("DOMContentLoaded", async function(event) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // assuming this route used a method other than GET,
    // like POST, so plain fetch() won't work
    const myInit = { method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({ message: "hi can you tell me the time?" }),
    };
    const myRequest = new Request("/time", myInit);
    const response = await fetch(myRequest);
    const json = await response.json();
    console.log("fetch POST /time", myInit, json);
    document.querySelector("#clientMessage").textContent = JSON.parse(myInit.body).message;
    document.querySelector("#serverMessage").textContent = json.message;
    document.querySelector("#timePost").textContent = json.content;
});
