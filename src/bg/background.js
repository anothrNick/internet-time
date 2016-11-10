// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

var activeStart = undefined;
var lastActive = undefined;
//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request);

  	chrome.storage.local.get('hosts', function(result){
  		var hosts = result.hosts;
	  	if(hosts.hasOwnProperty(request.hostname)) {
	  		hosts[request.hostname].count++;
	  	}
	  	else {
		  	hosts[request.hostname] = {
		  		duration: 0.00,
		  		count: 1,
		  		favicon: ''
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
		  	if(hosts.hasOwnProperty(lastActive)) {
		  		if(hosts[lastActive].favicon == '')
		  			hosts[lastActive].favicon = tabs[0].favIconUrl;
		  	}
		  	else {
			  	hosts[lastActive] = {
			  		duration: 0.00,
			  		count: 1,
			  		favicon: tabs[0].favIconUrl
			  	};
		  	}
		});
  		chrome.storage.local.set({'hosts': hosts});
  	});
});