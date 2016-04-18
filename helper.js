$(document).ready(function() {
    
    if (!(window.location.host === "sys.nju.edu.cn")) return;
        
    var $a = $( "td.plc div.pct div.pcb div.t_fsz a");

    if (typeof($a) !== "undefined" && $a.length > 0) {
        sendToBackground( $a.get(0).href);
        document.querySelector("#fastpostmessage").value="已收到";
        document.querySelector("#fastpostsubmit").click()
    }
});


/**
 * param url: string    link url of homework
 */
function sendToBackground(url) {
    chrome.runtime.sendMessage({"data":{"url":url}})
}
