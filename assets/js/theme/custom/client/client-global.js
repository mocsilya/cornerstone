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
	const url = $('.custom-brand-url').attr('data-brand-url');
	const placement = $('.custom-brand-url');
	console.log('url: ' + url);
	$.ajax({ 
		url: url, 
		processData : false,
		cache: true,
		success: function(data) {
			const html = $.parseHTML( data );
			const image = $(html).find('.brand-image-container').html();
			console.log('image: ' + image);
			if (image) {
				$(placement).html(image);
	    	}
		}
	});
}
