(function(w, d) {

	var modal		= d.querySelector('.modal'),
		mask		= d.querySelector('.mask'),
		content		= modal.querySelector('.content'),
		portfolio	= d.querySelector('.portfolio'),
		hammertime	= new Hammer(modal),
		justMoved	= false,
		itens;

	function init() {
		attachEvents();
	}

	function attachEvents() {
		delegate(portfolio, '.port-item', 'click', openModal);
		delegate(portfolio, '.port-item h3', 'click', openModal);
		delegate(portfolio, '.port-item img', 'click', openModal);
		mask.addEventListener('click', closeModal);
	}

	function attachWindowEvents() {
		w.addEventListener('resize', setSizes);
		w.addEventListener('keyup', checkKey);
		hammertime.on('swipeleft', move.bind(null, true));
		hammertime.on('swiperight', move.bind(null, false));
	}

	function removeWindowEvents() {
		w.removeEventListener('resize', setSizes)
		w.removeEventListener('keyup', checkKey);
	}

	function checkKey(e) {
		if (e.keyCode === 37)
			move(false);
		else if(e.keyCode === 39)
			move(true);
		else if(e.keyCode === 27)
			closeModal();
	}

	function openModal(e) {
		var target = e.target;

		while (!target.classList.contains('port-item'))
			target = target.parentNode;

		var list = target.querySelector('.job-img-list');
		content.innerHTML = '';
		content.appendChild(target.querySelector('.job-img-list').cloneNode(true));

		modal.classList.add('opened');
		d.body.style.overflow = 'hidden';
		
		itens	= content.querySelectorAll('.job-img-list li');

		setSizes();
		attachWindowEvents();
	}

	function closeModal(e) {
		modal.classList.remove('opened');
		d.body.style.overflow = '';
		removeWindowEvents();
	}

	function setSizes() {
		itens[0].style.width = '';

		var	unit	= itens[0].offsetWidth
			ratio	= screen.orientation.type.indexOf('landscape') !== -1 ? 0.7 : 0.9;
		
		unit = unit < screen.availWidth ? unit : (screen.availWidth*ratio);

		content.style.width = unit + 'px';
		content.querySelector('.job-img-list').style.width = (unit * itens.length) + 'px';

		for (var i = 0, len = itens.length; i < len; i++)
			itens[i].style.width = unit + 'px';
	}

	function move(dir) {
		if (justMoved)
			return;

		justMoved = true;

		var ul		= content.querySelector('.job-img-list'),
			moved	= parseInt(ul.style.marginLeft || 0),
			tomove = itens[0].offsetWidth;

		w.setTimeout(function() {
			justMoved = false;
		}, 500);

		dir && next(ul, moved, tomove);
		!dir && prev(ul, moved, tomove);
	}

	function next(ul, moved, tomove) {
		if (moved <= ((itens.length-1) * tomove) * -1)
			return;

		ul.style.marginLeft = (moved - tomove) + 'px';
	}

	function prev(ul, moved, tomove) {
		if (moved >= 0)
			return;

		ul.style.marginLeft = (moved + ul.querySelector('li').offsetWidth) + 'px';
	}

	init();

}(window, document));