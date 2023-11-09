/**
 * Custom global client js
*/
import 'slick-carousel';
import utils from '@bigcommerce/stencil-utils';

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
	
	$('.page-product .category-description-button').show();
	$('.page-product .category-description-button span.button').click(function(e) {
		e.preventDefault();
		$('.page-product .category-description-trim').toggleClass('is-closed');
		if ($(this).parent().hasClass('is-open')) {
			$(this).parent().removeClass('is-open');
		} else {
			$(this).parent().addClass('is-open');
		}
	});

	/**
	* Cart Upsell
	*/
	if ($('body.page-cart .cart-upsell').length) {
		var productId = $('.cart-upsell').data('upsell-id');
	} else {
		var productId = 0;
	}
	if (productId !== 0) { 
		utils.api.product.getById(productId, { template: 'custom/product-upsell' }, (err, response) => {
			if (!$.trim(response)){   
				console.log("Upsell Item: Data Not Loaded");
			} else {   
				$('.cart-upsell').append(response);
			}		
		})
	}
}
