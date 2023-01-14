// @ts-nocheck
import _ from "lodash";

var threshold = 0;
var audience = "Knowledgeable",
    formality = "Neutral",
    positivity = "Neutral",
    intent,
    context;

// Get the wrapper element
function getWrapper() {
    return document.querySelectorAll('div[class="notion-page-content"]')[0];
}

// Function to scan for new elements
let scanDiv = (function () {
    var MutationObserver =
        window.MutationObserver || window.WebKitMutationObserver;
    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) return;
        if (MutationObserver) {
            var mutationObserver = new MutationObserver(callback);
            mutationObserver.observe(obj, {
                childList: true,
                subtree: false
            });
            return mutationObserver;
        } else if (window.addEventListener) {
            obj.addEventListener("DOMNodeInserted", callback, false);
            obj.addEventListener("DOMNodeRemoved", callback, false);
        }
    };
})();

// Get the text content from the scanDiv wrapper
let getTextContent = (function (): string {
    return function (el) {
        let block = el.querySelectorAll('div[class="notion-selectable"]')[0];

        // Only proceed if query success, otherwise return empty string
        if (block) {
            let blockInnerTextContent = block.querySelectorAll(
                'div[data-content-editable-leaf="true"]'
            )[0];
            if (blockContent) return blockInnerTextContent.innerText;
            else return "";
        } else return "";
    };
})();

let setTextContent = (el, text) => {
    let blockContent = el.querySelectorAll(
        'div[data-content-editable-leaf="true"]'
    )[0];
    window.alert("blockContent: " + "clicked");
    blockContent.innerText = "Clicked!";
};

// Function to append advisory
let addWarning = (function () {
    return async function (el: Element, score: number) {
        console.log(el);
        // Get the tweet from this element
        let blockInnerTextContent = el.querySelectorAll(
            'div[data-content-editable-leaf="true"]'
        )[0];

        blockInnerTextContent.style.color = "red";
        blockInnerTextContent.addEventListener("click", () => {
            generateNewContentAndReplace(blockInnerTextContent);
        });

        return;
    };
})();

async function generateNewContentAndReplace(currentNode) {
    console.log(currentNode);
    console.log("Ran generateNewContentAndReplace!");
    try {
        const resp = await fetch("http://localhost:8080/api/v1/completion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                context: "general",
                audience: "general",
                intent: "general",
                formality: "neutral",
                role: "anyone",
                text: currentNode.textContent
            })
        });
        const data = await resp.json();
        console.log(resp);
        console.log(data);
    } catch (error) {
        console.log(error);
    }

    // currentNode.innerHTML = resp.content;
    currentNode.style.color = "black";
}

async function getBlockTextContentRiskScore(blockText): number {
    // Awaiting backend team to introduce API and return a score
    // axios.post("http://localhost:5000/api/v1/analyze", {
    //     text: blockText
    // });

    // Return a random between 0 to 50
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 50));
        }, 1000);
    });
}

// Load modal
let loadSideBar = (function () {
    try {
        setTimeout(() => {
            const notionMainContainer = document.querySelectorAll(
                'div[class="notion-cursor-listener"]'
            )[0];

            // Create a new div element
            const sidebar = document.createElement("div");
            sidebar.id = "sidebar";
            sidebar.className = "Sidebar__SidebarWrapper";

            // Add our title to the sidebar
            const sidebarTitle = document.createElement("h3");
            sidebarTitle.innerText = "Robin Hood";
            sidebarTitle.className = "Popup__Title Title";
            sidebar.appendChild(sidebarTitle);

            // Make it scrollable
            const sidebarScrollable = document.createElement("div");
            sidebarScrollable.className = "Popup__Scrollable Scrollable";
            sidebarScrollable.id = "sidebarScrollable";
            sidebar.appendChild(sidebarScrollable);

            // Get the 2nd child of the main container
            const mainContainerFirstChild = notionMainContainer.children[2];
            // Insert the sidebar after the 2nd child
            notionMainContainer.insertBefore(sidebar, mainContainerFirstChild);
        }, 1000);
    } catch (err) {
        console.log(err);
    }
})();

// Function to call for each element of the homepage
let runScript = (function () {
    return async function (allNodes) {
        // Cast allNodes to an array
        allNodes = Array.from(allNodes);
        let promises = allNodes.map(async (node, i) => {
            // Reset score
            let score = 0;
            // Get block's text content for analysis
            let blockTextContent = getTextContent(node);
            // Make backend call to identify if content might be generated by a bot
            blockTextRiskScore = await getBlockTextContentRiskScore(
                blockTextContent
            );
            // Log score of content
            console.log(
                "Paragraph has a risk score eval of: " + blockTextRiskScore
            );

            if (blockTextRiskScore > threshold) {
                console.log("THIS IS BEING INVOKED! INDEED!");
                addWarning(node, score);
            }
            return blockTextRiskScore;
        });
        let allScores = await Promise.all(promises);
        return allScores;
    };
})();

let loadCss = function () {
    let $ = document;
    let head = $.getElementsByTagName("head")[0];
    let link = $.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = chrome.runtime.getURL("contentStyle.css");
    link.media = "all";
    head.appendChild(link);
};

function waitFor(
    varSetter: any,
    sleepTime: any,
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
    getWrapper,
    1000,
    (wrapper) => wrapper !== undefined,
    function (wrapper) {
        console.log("Preliminary wrapper get succeeded");
        // First pass
        let blocks = wrapper.children;
        console.log("wrapper", wrapper.children);
        loadCss();
        runScript(blocks);
        loadSideBar();
        // Observe for changes of wrapper's child nodes
        (() => {
            scanDiv(wrapper, function (el) {
                var addedNodes = [],
                    removedNodes = [];

                // Record down added divs
                el.forEach((record) => {
                    record.addedNodes.length &
                        addedNodes.push(...record.addedNodes);
                });

                // Record down deleted divs
                el.forEach(
                    (record) =>
                        record.removedNodes.length &
                        removedNodes.push(...record.removedNodes)
                );

                // Run the script for added nodes
                runScript(addedNodes);

                console.log("Added:", addedNodes, "Removed:", removedNodes);
            });
        })();
    }
);
