(function(w, d) {

	var header	= d.querySelector('.main-header'),
		menu	= d.querySelector('.portfolio');

	w.addEventListener('scroll', function(e){
		var distanceY	= w.pageYOffset || d.documentElement.scrollTop;
		
		if (distanceY > 0) {
			header.classList.add('smaller');
			menu.classList.add('smaller');
		} else if(header.classList.contains('smaller')) {
			header.classList.remove('smaller');
			menu.classList.remove('smaller');
		}
	});

}(window, document));