	/**
 * Slider Development Test for Beach Body Interview
 *
 * By: Jared Williams
 * http://anti-code.com
 *
 */

var Slider = {
	activeSlide: '#eye1',
	activeSection: '#eyes',
	activePage: '#group-0',
	prevSlide: '#lip12',
	nextSlide: '#eye2',

	init: function() {
		var sections = document.getElementsByTagName('section'),
			thumbs = $('.thumbs'),
			bullets = $('li', '.bullets');

		// Setup the initial state of the activeSlide, section, bullet and arrows
		$(Slider.activeSection +', .thumbs li:first, .bullets li:first').addClass('active');
		$(Slider.activeSection).find('.thumbs li, .bullets li').show();
		$(Slider.activeSection).find('.expand').text('-');
		$('#prev').attr('href', Slider.prevSlide);
		$('#next').attr('href', Slider.nextSlide);

		// Handle clicks on the sections of accordion
		$('h1').on('click', function(e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) return;

			Slider.activeSection = '#' + $(this).parent().attr('id');
			Slider.activeSlide = $(Slider.activeSection).find('.thumbs li:first a').attr('href').split('t')[0];

			Slider.collapse();
		});

		// Handle clicks on the bullet nav
		$(bullets).find('a').on('click', function(e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) return;
			Slider.activePage = $(this).attr('href');

			$('.thumbs li, .bullets li').removeClass('active');
			$(this).parent().addClass('active');

			Slider.goToPage();
		});

		// Handle clicks on thumbnails
		$('.thumbs li').find('a').on('click', function(e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) return;

			Slider.activeSlide = $(this).attr('href');

			$('.thumbs').find('li').removeClass('active');
			$(this).parent().addClass('active');

			Slider.moveToSlide();
		});

		// Handle clicks on the next / previous links
		$('.arrows').find('a').on('click', function(e) {
			e.preventDefault();

			Slider.activeSlide = $(this).attr('href');
			//$(this).attr('id');

			Slider.moveToSlide();
		});

	},

	/**
	 * Collapse called when on first or last thumbnail of a section and prev or next arrow is clicked,
	 * or when the H1 of a section is clicked.
	 *
	 * And change the - to a + in the H1 tag
	 */
	collapse: function() {
		console.log(Slider.activeSection);

		$('section').find('.thumbs').css({ left: 0 });
		$('section, .thumbs li, .bullets li').removeClass('active');
		$('section').find('.thumbs li, .bullets li').hide();
		$('section').find('.expand').text('+');

		Slider.expand();
	},

	/**
	 * Expand called by collapse method only.
	 *
	 * Always highlight the first thumb of the section
	 * and change the + to a - in the H1 tag
	 * and if necessary, make first bullet of thumbnail page nav active
	 */
	expand: function() {
		//console.log(Slider.activeSection);
		console.log();

		// Need to get the index of the first thumbnail of the expanded section
		$(Slider.activeSection).find('.expand').text('-');
		$(Slider.activeSection).addClass('active').find('.thumbs, .bullets').find('li:first').addClass('active');
		$(Slider.activeSection).addClass('active').find('.thumbs, .bullets').find('li').show();

		Slider.moveToSlide();
	},
	/**
	 * MoveToSlide called by the expand method and the goToPage method
	 * for moving the slider of large images to the currently activeSlide
	 *
	 * This is the last method called
	 */
	moveToSlide: function() {
		var images = $('.images').find('li');

		images.hide();
		$(Slider.activeSlide).show();

		// Set the next/previous href values according to the activeSlide
		Slider.prevSlide = '#' + $(Slider.activeSlide).prev().attr('id');
		Slider.nextSlide = '#' + $(Slider.activeSlide).next().attr('id');

		$('#prev').attr('href', Slider.prevSlide);
		$('#next').attr('href', Slider.nextSlide);
	},
	/**
	 * GoToPage called when clicking on bullet nav icons
	 * for showing the next group of 3 thumbnails that exist if any
	 */
	goToPage: function() {
		Slider.activeSlide = $(Slider.activePage).find('a').attr('href');

		$('.thumbs').find('li').removeClass('active');
		$('.thumbs').find(Slider.activePage).addClass('active');

		if ($('#group-0').hasClass('active')) {
			$('#group-0').parent().css({ left: 0 });
		} else if ($('#group-1').hasClass('active')) {
			$('#group-1').parent().css({ left: -336 +'px' });
		} else if ($('#group-2').hasClass('active')) {
			$('#group-2').parent().css({ left: -672 +'px' });
		}

		Slider.moveToSlide();
	},

	toArray: function(nodes) {
		return Array.prototype.slice.call(nodes);
	},
	keyExists: function(key, search) {
		if (!search || (search.constructor !== Array && search.constructor !== Object)) { return false; }
		for (var i = 0; i < search.length; i++) {
			if (search[i] === key) { return true; }
		}
		return key in search;
	},
	forEach: function(arr) {
		[].forEach.call(arr, function(key, index) {
			return [key, index];
		});
	},

	anything: function(images) {
		images.anythingSlider({
			easing: "swing",
			delay: 1000,
			autoPlay: false,
			hashTags: false,
			resizeContents: false,
			infiniteSlides: true,
			buildNavigation: true,
			buildStartStop: false,
			navigationFormatter: function(i, panel) {
				//Slider.thumbnails(index, '');
				panel = panel[0];
				/*return {
					'class'  : panel.className,
					'html': '<a class="panel' + i + '" href="#"><img src="assets/' + panel.id + 't.jpg" /></a>'
				};*/
			}
		});

		var activeIndex = $('li.activePage').index();
		$('.arrow a').on('click', function(e) {
			if ($(this).parent().hasClass('back')) {
				Slider.highlight('arrows', $(this), activeIndex - 1);
			} else if ($(this).parent().hasClass('forward')) {
				Slider.highlight('arrows', $(this), activeIndex + 1);
			}
			e.preventDefault();
		});
	}

};
Slider.init();