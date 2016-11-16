chrome.storage.local.get('hosts', function(result){
    hosts = result.hosts;
    if(Object.keys(hosts).length) {
	    var array=[];
		for(a in hosts){
			array.push([a,hosts[a]])
		}
		array.sort(function(a,b){return a[1].duration - b[1].duration});
		array.reverse();

		for (var i = 0; i < array.length; i++) {
			var key = array[i][0];
			var host = array[i][1];
	    	var html = createRow(key, host);
	    	document.getElementById("table").innerHTML = document.getElementById("table").innerHTML + html;
		}
	}
	else {
		showEmpty();
	}
});

var clearBtn = document.getElementById("clear-history");
clearBtn.addEventListener("click", clearHistory);

function createRow(key, host) {
	var now = new Date().getTime();
	var start = moment(now);
	var end   = moment(now - host.duration);
	return "<tr class='host-row'>" +
				"<td><img src='https://www.google.com/s2/favicons?domain="+key+"' /></td>"+
				"<td>"+key+"</td>"+
				"<td style='text-align:right;'>"+ end.from(start, true) +"</td>"
			"</tr>";
}

function clearHistory() {
	chrome.storage.local.set({'hosts': {}});
	showEmpty();
}

function showEmpty() {
	document.getElementById("table").innerHTML = "<tr><td colspan='3' style='border:0;'>Browse around to show some data :)</td></tr>";
}