

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("message");
    console.log(request);
    var url = request.data.url;
    chrome.downloads.download({"url": url, "method": "GET", "FilenameConflictAction": "prompt"}, function(id) {
        console.log("download"); 
        console.log(id); 
    });
});



