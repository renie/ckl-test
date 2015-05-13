var delegate = function(parent, selector, event, fn) {
	function selectorMaches(currentNode, sel) {
		var vendors = ["webkit", "ms", "moz"],
			vendor,
			i = 0;

		for(; i < 3; i++) {
			vendor = vendors[i];
		
			if((vendor + "MatchesSelector") in currentNode)
				return currentNode[vendor + "MatchesSelector"](sel);
		}
	}

	parent.addEventListener(event, function(e) {
		if (selectorMaches(e.target, selector))
			fn(e);
	});
};