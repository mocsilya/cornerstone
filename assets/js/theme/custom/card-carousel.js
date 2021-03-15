/**
 * Adds swatches to product cards.
 * templates > components > products > card.html
*/
import 'slick-carousel';

export default function () {
	$('.product.spotlight').each(function() {
		$(this).find('.spotlight-carousel').slick({
			slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: true
		});	
	});
}
