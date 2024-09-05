/**
 * Custom global client js
*/
import 'slick-carousel';

export default function () {
	$('.subcategories-grid-image').slick({
		slidesToShow: 2,
        slidesToScroll: 1,
		arrows: true,
		draggable: true,
		swipe: true,
        infinite: false,
        dots: false,
		mobileFirst: true,
        responsive: [
			{
				breakpoint: 551,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 801,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1261,
				settings: {
					slidesToShow: 5
				}
			}
		]
	});	
}
