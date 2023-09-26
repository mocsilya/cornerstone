/**
 * Custom global client js
*/
import 'slick-carousel';

export default function loaded () {
	$('.review-slider').slick({
		slidesToShow: 1,
        slidesToScroll: 1,
		swipe: true,
		draggable: true,
		touchMove: true,
        infinite: false,
		autoplay: false,
		autoplaySpeed: 6000,
        dots: false,
		arrows: true,
		mobileFirst: true,
        responsive: [
			{
				breakpoint: 801,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 1260,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1439,
				settings: {
					slidesToShow: 4
				}
			}
		]
	});
}