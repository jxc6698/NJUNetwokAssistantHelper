
var Debug = true;

var download = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var url = request.data.url;
    chrome.downloads.download({"url": url, "method": "GET", "conflictAction": "prompt"}, function(id) {
        console.log("download"); 
        console.log(id); 
		download[id] = {
			"tabid": sender.tab.id
			}
    });
});

function debugout(obj) {
	if (Debug)
		console.log(obj);
}

chrome.downloads.onCreated.addListener(function (downloadItem) {
	debugout("oncreate" );
	debugout(downloadItem.id);
});


chrome.downloads.onChanged.addListener(function (downloadDelta) {
	debugout("onchanged");
	debugout(downloadDelta);
	var id = downloadDelta.id;
	if (typeof(downloadDelta.filename) === "object") {
		if (id in download) {
			chrome.tabs.sendMessage(download[id].tabid, {cmd: "success"});
			delete(download[id])
		}
	} else if (downloadDelta.state) {
		if (downloadDelta.state.current === "interrupted") {
			chrome.tabs.sendMessage(download[id].tabid, {cmd: "failed"});
			delete(download[id])
		}
	}
});

/*
chrome.downloads.onDeterminingFilename.addListener(function (downloadItem, suggest) {
	console.log(downloadItem); 
	// suggest auto-called 
	if (!(downloadItem.id in download)) return
	
	chrome.tabs.sendMessage(download[downloadItem.id].tabid, {cmd: "failed"});
	delete(download[downloadItem.id])
	
//	chrome.downloads.cancel(downloadItem.id, function () {})
	suggest({"filename": downloadItem.filename, "conflictAction": "prompt"})

	return false;
});

*/
