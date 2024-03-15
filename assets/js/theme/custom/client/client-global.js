/**
 * Custom global client js
*/
export default function () { 
	$(".cart-terms-click").click(function(e) {
		e.preventDefault();
		$(".cart-terms").hide();
	});
	
	$(window).on("resize", function () {	
		if ($(window).width() > 1260) {	
			if (!$('.productView-wrap').hasClass('payment-product')){
			
				$('.productView-details-large.product-data, .productView-details-large.product-options').removeClass('productView-details-fixed').removeAttr('style');
			
				var totalWidth = $('.productView').outerWidth();
				var halfWidth = totalWidth / 2;
				var photoWidth = $('.productView-images.productView-images-large').outerWidth();
				var dataWidth = $('.productView-details-large.product-data').outerWidth();
				var dataHeight = $('.productView-details-large.product-data').outerHeight();
		
				var leftMargin = photoWidth - halfWidth;
			
				$('.productView-details-large.product-data, .productView-details-large.product-options').css('width', dataWidth);
		
				$(window).scroll(function() {    
				    var scroll = $(window).scrollTop();
				    if (scroll > 168) {
				        $('.productView-details-large.product-data, .productView-details-large.product-options').addClass('productView-details-fixed').css('margin-left', leftMargin);
						$('.productView-details-large.product-options').css('margin-top', dataHeight);
				    } else {
				        $('.productView-details-large.product-data, .productView-details-large.product-options').removeClass('productView-details-fixed').css('margin-left', '0px');
						$('.productView-details-large.product-options').css('margin-top', '0px');
				    }
			
					var top_of_element = $(".related-similar").offset().top;
					var bottom_of_element = $(".related-similar").offset().top + $(".related-similar").outerHeight();
					var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
					var top_of_screen = $(window).scrollTop();
			
					//if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
					if (bottom_of_screen > top_of_element) {
						$('.productView-details-large.product-data, .productView-details-large.product-options').removeClass('productView-details-fixed').css('margin-left', '0px');
						$('.productView-details-large.product-options').css('margin-top', '0px');
					} else {
						// the element is not visible, do something else
					}
				});
			}
		} else {
			$('.productView-details-large.product-data, .productView-details-large.product-options').removeClass('productView-details-fixed').removeAttr('style');
		}
	}).resize();
}
