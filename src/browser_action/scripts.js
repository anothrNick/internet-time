chrome.storage.local.get('hosts', function(result){
    hosts = result.hosts;
    console.log(hosts);

    for(var key in hosts) {
    	if(hosts[key].duration) {
	    	var html = createRow(key, hosts[key]);
	    	document.getElementById("table").innerHTML = document.getElementById("table").innerHTML + html;
	    }
    }
});

function createRow(key, host) {
	var now = new Date().getTime();
	var start = moment(now);
	var end   = moment(now - host.duration);
	return "<tr class='host-row'>" +
				"<td><!--<img src="+host.favicon+" />-->"+key+"</td>"+
				"<td style='text-align:right;'>"+ end.from(start, true) +"</td>"
			"</tr>";
}