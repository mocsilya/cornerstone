/**
 * Slick carousel for header bar on mobile/tablet
*/
import 'slick-carousel';

export default function loaded () {
	$('.header-bar-list').slick({
		slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
		autoplay: true,
		autoplaySpeed: 6000,
        dots: false,
		arrows: true,
		mobileFirst: true,
        responsive: [
			{
				breakpoint: 801,
				settings: {
					variableWidth: true,
					slidesToShow: 4
				}
			}
		]
	});
}