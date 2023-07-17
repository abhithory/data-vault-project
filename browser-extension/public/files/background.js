// background.js
chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed.');
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {    
        chrome.windows.create({
            url: `index.html?datatype=${encodeURIComponent(message.message)}`,
            type: 'popup',
            width: 357,
            height: 600,
          });

});