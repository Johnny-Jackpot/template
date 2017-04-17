//indicate screen width//
"use strict";

(function() {

	function createIndicator() {
		var div = document.createElement('div');
		div.style.position = 'fixed';
		div.style.top = "20px";
		div.style.left = "20px";
		div.style.padding = "5px";
		div.style.border = "1px solid grey";
		div.style.borderRadius = "10px";
		div.style.color = "grey";
		div.style.opacity = "1";

		return div;
	}	

	function updateIndicator(indicator) {
		indicator.innerText = 
			"width: " + document.documentElement.clientWidth;
	}

	
	var indicator = createIndicator();

	updateIndicator(indicator);
	document.body.appendChild(indicator);

	window.addEventListener('resize', function(event) {
		updateIndicator(indicator);
	});

})();

var mainSlider = $('#mainSlider').sly({
	left: '#mainSliderLeft',
	right: '#mainSliderRight',
	slides: '#mainSlider .slide',
	interval: 10000,
});

var secondarySlider = $('#slider2').sly({
	left: '#left2',
	right: '#right2',
	slides: '#slider2 div',
	interval: 5000
});