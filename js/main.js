	/**
 * Slider Development Test for Beach Body Interview
 *
 * By: Jared Williams
 * http://anti-code.com
 *
 */

var Slider = {
	thumbs: [],

	init: function() {
		// Create slider
		Slider.anything($('.images'));

		//console.log($('.images').anythingSlider());

		// if ($('.activePage') {
		//	Slider.thumbnails();
		// }

		var section = $('section', '#accordion'),
			thumbs = $('li', '.thumbs'),
			first = $(section[0]);

		thumbs = Array.prototype.slice.call(thumbs);

		first.addClass('active').find('.thumbs, .bullets').show();
		first.find('li:first').addClass('selected');
		first.find('.expand').text('-');

		// Control the accordion section clicks
		section.find('h1').on('click', function(e) {
			Slider.thumbnails($(this), section);
			e.preventDefault();
		});

		// Handle the thumbnail clicks
		[].forEach.call(thumbs, function(thumb, index) {
			$(thumb).on('click', function(e) {
				e.preventDefault();
				Slider.thumbEvents(thumb, index);
			});
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
	},

	// Split up the thumbnails
	thumbnails: function(thumb, section) {
		if ($(thumb).parent().hasClass('active')) return;

		section.removeClass('active').find('.thumbs li').removeClass('selected');
		section.find('.expand').text('+');

		$(thumb).find('.expand').text('-').parents('section').addClass('active').find('li:first').addClass('selected');
	},
	thumbEvents: function(thumb, index) {
		$('.thumbs').find('li').removeClass('selected');

		$(thumb).addClass('selected');

		Slider.moveToSlide(index + 1);
	},
	moveToSlide: function(index) {
		$('.images').anythingSlider(index);
	}

};
Slider.init();