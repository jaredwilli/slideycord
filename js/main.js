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
			images = $('.images'),
			bullets = $('.bullets');

		// Setup the initial state of the activeSlide, section, bullet and arrows
		$(Slider.activeSection).addClass('active').find('.expand').text('-');
		$('.thumbs, .bullets, .images').find('li:first').addClass('active').show();

		document.getElementById('prev').href = Slider.prevSlide;
		document.getElementById('next').href = Slider.nextSlide;

		// Handle clicks on the sections of accordion
		$('h1').on('click', function(e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) return;

			Slider.activeSection = '#' + $(this).parent().attr('id');
			Slider.activeSlide = $(Slider.activeSection).find('.thumbs > li:first a').attr('href').split('t')[0];

			Slider.collapse();
			Slider.updateArrows();
			Slider.moveToSlide();
		});


		// Handle clicks on thumbnails
		$('li', thumbs).find('a').on('click', function(e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) return;

			Slider.activeSlide = $(this).attr('href');

			$('.thumbs, .images').find('li').removeClass('active');
			$(this).parent().addClass('active');

			Slider.updateArrows();
			Slider.moveToSlide();
		});

		// Handle clicks on the bullet nav
		$(bullets).find('a').on('click', function(e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) return;

			Slider.activePage = $(this).attr('href');

			Slider.goToPage();
			Slider.updateArrows();
			Slider.moveToSlide();
		});

		// Handle clicks on the next / previous links
		$('.arrows').find('a').on('click', function(e) {
			e.preventDefault();


			if ($(Slider.activeSlide).hasClass('last')) {
				Slider.activeSlide = '#' + $('li:last', '.images').attr('id');
				Slider.activeSection = $('a[href='+ Slider.activeSlide +']').parents('section').attr('id');
				Slider.collapse();
			}

			Slider.activeSlide = $(this).attr('href');

			Slider.updateArrows();
			//Slider.whatNow();
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
		console.log(Slider);

		$('.thumbs, .bullets').find('li').removeClass('active');
		$('section').removeClass('active').find('.expand').text('+');
		$('.thumbs', 'section').css({ left: 0 });

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
		console.log(Slider);

		// Need to get the index of the first thumbnail of the expanded section
		$('.thumbs, .bullets', Slider.activeSection).find('li:first').addClass('active').show();
		$(Slider.activeSection).addClass('active').find('.expand').text('-');
	},
	updateArrows: function() {
		// Set the next/previous href values according to the activeSlide
		Slider.prevSlide = '#' + $(Slider.activeSlide).prev().attr('id');
		Slider.nextSlide = '#' + $(Slider.activeSlide).next().attr('id');

		// Fix the next/prev links when activeSlide is first or last
		if ($(Slider.activeSlide).hasClass('first')) {
			Slider.prevSlide = '#' + $('.last', '.images').attr('id');
			Slider.collapse();
		}
		if ($(Slider.activeSlide).hasClass('last')) {
			Slider.nextSlide = '#' + $('.first', '.images').attr('id');
		}

		document.getElementById('prev').href = Slider.prevSlide;
		document.getElementById('next').href = Slider.nextSlide;
		console.log(Slider.prevSlide, Slider.nextSlide);
	},
	/**
	 * WhatNow is called by the next/previous arrow links to check
	 * whether or not other actions should be done
	 *
	 * Calls goToPage if activeSlide thumbnail has an ID attribute
	 * Calls collapse method if the ID of the parent section of the activeSlide changes
	 */
	whatNow: function() {
		console.log(Slider);

		$('.thumbs').find('li').removeClass('active');

		$('a[href='+ Slider.activeSlide +']').parent().addClass('active');

		if ($('.thumbs .active').attr('id') !== Slider.activePage) {
			Slider.activePage = '#'+ $('.thumbs .active').attr('id');
			Slider.goToPage();
		}

	},
	/**
	 * GoToPage called when clicking on bullet nav icons
	 * or by the whatNow method if next/previous activate a new group
	 * for showing the next group of 3 thumbnails that exist if any
	 *
	 * Sets the activeSlide to show the corresponding image
	 */
	goToPage: function() {
		console.log(Slider);

		Slider.activeSlide = $(Slider.activePage).find('a').attr('href');

		$('.thumbs, .bullets, .images').find('li').removeClass('active');
		$('a[href='+ Slider.activePage +']').parent().addClass('active')
		$(Slider.activePage).addClass('active');

		//$(Slider.activeSlide).addClass('active');

		if ($('#group-0').hasClass('active')) {
			$('#group-0').parent().css({ left: 0 +'px' });
		}
		else if ($('#group-1').hasClass('active')) {
			$('#group-1').parent().css({ left: -336 +'px' });
		}
		else if ($('#group-2').hasClass('active')) {
			$('#group-2').parent().css({ left: -672 +'px' });
		}
	},
	/**
	 * MoveToSlide called by each click event handler
	 * for moving the slider of large images to the currently activeSlide
	 *
	 * Always called last
	 */
	moveToSlide: function() {
		console.log(Slider);

		$('li', '.images').removeClass('active');
		$(Slider.activeSlide).addClass('active');
	}
};
Slider.init();