console.log(process.env.title);

const initialize = async function() {
    await import("./util/env.js");
    console.log(process.env.title);
};

initialize();
