/**
 * Custom global client js
*/
import 'slick-carousel';

export default function loaded () {
	/*  Slick carousel for brands */
	$('[data-sub-layout-container="c5d7ec28-af78-43e2-99f7-24d33953a1b5"] .custom-widget-list').slick({
		slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
		autoplay: true,
		autoplaySpeed: 6000,
        dots: false,
		arrows: true,
		mobileFirst: true,
		swipe: true,
        responsive: [
			{
				breakpoint: 801,
				settings: {
					variableWidth: true,
					slidesToShow: 6
				}
			}
		]
	});
}
