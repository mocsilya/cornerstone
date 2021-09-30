/**
 * Cutstom Widget Scripts
*/
import 'slick-carousel';

export default function () {
	$('.custom-widget-carousel-yes').each(function() {
		$(this).find('.custom-widget-list').slick({
			slidesToShow: 2,
	        slidesToScroll: 2,
	        infinite: true,
			autoplay: true,
			autoplaySpeed: 6000,
	        dots: false,
			arrows: true,
			mobileFirst: true,
			swipe: true,
	        responsive: [
				{
					breakpoint: 1261,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6
					}
				},
				{
					breakpoint: 801,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				},
				{
					breakpoint: 551,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}
			]
		});	
	});
}

