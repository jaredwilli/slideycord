	/**
 * Slider Development Test for Beach Body Interview
 *
 * By: Jared Williams
 * http://anti-code.com
 *
 */

var Slider = {
	sections: null,
	thumbs: null,
	bullets: null,

	init: function() {
		// Create slider
		Slider.anything($('.images'));

		//console.log($('.images').anythingSlider());

		// if ($('.activePage') {
		//	Slider.thumbnails();
		// }

		var sections = $('section', '#accordion'),
			thumbs = $('li', '.thumbs'),
			bullets = $('li', '.bullets'),
			first = $('section:first, .bullets li:first, .thumbs li:first');

		this.sections = this.toArray(sections);
		this.thumbs = this.toArray(thumbs);
		this.bullets = this.toArray(bullets);


		first.addClass('active');
		first.find('.expand').text('-');

		// Control the accordion section clicks
		[].forEach.call(this.sections, function(section, s) {
			//console.log(section);
			$(section).find('h1').on('click', function(e) {
				Slider.highlight('section', $(this), s);
				e.preventDefault();
			});
		});

		// Handle the thumbnail clicks
		[].forEach.call(this.thumbs, function(thumb, t) {
			//console.log(thumb);
			$(thumb).on('click', function(e) {
				Slider.highlight('thumb', $(this), t);
				e.preventDefault();
			});
		});

		// Handle the thumbnail clicks
		[].forEach.call(this.bullets, function(bullet, b) {
			//console.log(bullet);
			$(bullet).on('click', function(e) {
				$(bullets).removeClass('active');
				$(this).addClass('active');
				Slider.highlight('bullet', $(this), b);
				e.preventDefault();
			});
		});
	},

	/**
	 * Highlight called by the click events for thumbnails arrows and bullet page nav for thumbs
	 *
	 * It takes the node element clicked, and it's index. Used to get the slide to highlight
	 */
	highlight: function(type, node, index) {
		//console.log(node, index, $(node).closest('section'));

		switch(type) {

			case 'section':
				console.log(node, index);
				if ($(node).parent().hasClass('active')) return;

				$('section, .thumbs li, .bullets li').removeClass('active');
				$('section').find('.expand').text('+');

				$(node).parent().addClass('active').find('.thumbs li:first, .bullets li:first').addClass('active');
				$(node).find('.expand').text('-');

				var href = $('section:eq('+ index +') .thumbs').find('li:first a').attr('href').split('#')[1];
				console.log(Slider.thumbs, Slider.thumbs[$('.thumbs li.active').index()]);
				this.moveToSlide();
				break;

			case 'thumb':
				console.log(node, index);

				this.moveToSlide(index);
				break;

			case 'bullet':
				//console.log(node, index);
				var left = -1;
				if (index === 1) {
					left = -337;
				} else if (index === 2) {
					left = -673;
				}
				var slide = $(node).parents('.active').find('.thumbs').css({ left: left +'px' });
				$('.thumbs li').removeClass('active');
				$('#group-'+ index).addClass('active');

				this.moveToSlide($('#group-'+ index).index());
				break;

			case 'arrow':
				console.log(node, index);

				//this.moveToSlide(index);
				break;
		}
	},

	/**
	 * Collapse called when on first or last thumbnail of a section and prev or next arrow is clicked,
	 * or when the H1 of a section is clicked.
	 *
	 * And change the - to a + in the H1 tag
	 */
	collapse: function(section, index) {
		if ($(section).hasClass('active')) return;

		section.removeClass('active').find('.thumbs li').removeClass('selected');
		section.find('.expand').text('+');

		this.expand(section);
	},

	/**
	 * Expand called by collapse method only.
	 *
	 * Always highlight the first thumb of the section
	 * and change the + to a - in the H1 tag
	 * and if necessary, make first bullet of thumbnail page nav active
	 */
	expand: function(section, index) {
		// Need to get the index of the first thumbnail of the expanded section
		section.find('.thumbs').css({ height: 'toggle' });


		// Use the index to display the correct slide
		this.moveToSlide(index);
	},
	/**
	 * MoveToSlide called when by the highlight method only
	 * that way it will only need to be called once.
	 */
	moveToSlide: function(index) {
		$('.images').anythingSlider(index);
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