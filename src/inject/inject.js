chrome.extension.sendMessage({timing: performance.timing, hostname: window.location.hostname}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
		}
	}, 10);
});