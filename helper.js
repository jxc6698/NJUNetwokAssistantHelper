$(document).ready(function() {
    
    if (!(window.location.host === "sys.nju.edu.cn")) return;
        
    var $a = $( "td.plc div.pct div.pcb div.t_fsz a");

    if (typeof($a) !== "undefined" && $a.length > 0) {
        sendToBackground( $a.get(0).href);
    }
});


/**
 * param url: string    link url of homework
 */
function sendToBackground(url) {
    chrome.runtime.sendMessage({"data":{"url":url}})
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(request);
	if (request.cmd === "failed") {
		alert("already download");
		/* do nothing */
	} else if (request.cmd === "success") {
        document.querySelector("#fastpostmessage").value="已收到";
        document.querySelector("#fastpostsubmit").click()
	}
});
