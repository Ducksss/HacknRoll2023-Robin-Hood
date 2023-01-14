/**
 * This is the main entry point for the content script that run on https://docs.google.com/document/d/ pages.
 * It is loaded by the manifest.json file.
 *
 * @see https://developer.chrome.com/docs/extensions/mv3/content_scripts/
 * @see https://developer.chrome.com/docs/extensions/mv3/manifest/content_scripts/
 */

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        newsSite: "mothership",
        netFlix: true,
        mySport: "football",
        myHobby: "reading"
    });
});

chrome.tabs.onUpdated.addListener((tabId: any, changeInfo, tab) => {
    if (
        changeInfo.status === "complete" &&
        /^https:\/\/twitter.com/.test(tab.url as any)
    ) {
        chrome.scripting
            .executeScript({
                target: { tabId: tabId },
                files: ["../foreground/index.js"]
            })
            .then(() => {
                console.log("Injected Foreground JS.");
            })
            .catch((err) => {
                console.log("Error injecting Foreground JS: ", err);
            });
    }
});
