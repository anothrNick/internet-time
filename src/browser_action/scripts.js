chrome.storage.local.get('hosts', function(result){
    hosts = result.hosts;
    console.log(hosts);

    for(var key in hosts) {
    	var html = "<tr><td><!--<img src="+hosts[key].favicon+" />-->"+key+"</td><td>"+hosts[key].duration+"</td><td>"+hosts[key].count+"</td></tr>"
    	document.getElementById("table").innerHTML = document.getElementById("table").innerHTML + html;
    }
});