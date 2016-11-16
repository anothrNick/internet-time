var activeStart = undefined;
var lastActive = undefined;

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

  	chrome.storage.local.get('hosts', function(result){
  		var hosts = result.hosts;
	  	if(hosts.hasOwnProperty(request.hostname)) {
	  		hosts[request.hostname].count++;
	  	}
	  	else {
		  	hosts[request.hostname] = {
		  		duration: 0.00,
		  		count: 1
		  	};
	  	}

  		chrome.storage.local.set({'hosts': hosts});
  	});
    sendResponse();
  });

chrome.tabs.onActivated.addListener(function(event) {
  	chrome.storage.local.get('hosts', function(result){
  		var hosts = result.hosts;
		if(activeStart) {
			var timeSpent = new Date().getTime() - activeStart;
		  	if(hosts.hasOwnProperty(lastActive)) {
		  		hosts[lastActive].duration = timeSpent + hosts[lastActive].duration;
		  	}

		  	chrome.storage.local.set({'hosts': hosts});
		}

		activeStart = new Date().getTime();
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
		    lastActive = tabs[0].url.match(/^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/)[1];
		  	if(!hosts.hasOwnProperty(lastActive)) {
			  	hosts[lastActive] = {
			  		duration: 0.00,
			  		count: 1
			  	};
  				chrome.storage.local.set({'hosts': hosts});
		  	}
		});
  	});
});

setInterval(function(){
	if(lastActive) {
	  	chrome.storage.local.get('hosts', function(result){
	  		var hosts = result.hosts;
			if(activeStart) {
				var timeSpent = new Date().getTime() - activeStart;
			  	if(hosts.hasOwnProperty(lastActive)) {
			  		hosts[lastActive].duration = timeSpent + hosts[lastActive].duration;
			  	}

			  	chrome.storage.local.set({'hosts': hosts});
			}

			activeStart = new Date().getTime();
		});
	}
}, 10000);