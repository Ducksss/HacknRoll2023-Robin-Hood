function getWrapper() {
    return document.querySelectorAll('div[aria-label^="Timeline:"] > div')[0];
}

function waitFor(
    varSetter: any,
    sleepTime: number,
    condition: any,
    continuation: any
) {
    let variable = varSetter();
    if (!condition(variable)) {
        setTimeout(
            () => waitFor(varSetter, sleepTime, condition, continuation),
            sleepTime
        );
    } else {
        continuation(variable);
    }
}

waitFor(
    () => document.getElementById("myId"),
    100,
    (variable: any) => variable !== null,
    (variable: any) => {
        // do something with variable
        console.log("HELLO WORLD");
    }
);
