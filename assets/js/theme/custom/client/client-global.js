/**
 * Custom global client js
*/
export default function () { 
	$(".cart-terms-click").click(function(e) {
		e.preventDefault();
		$(".cart-terms").hide();
	});
	
	/*
	$(window).on('resize', function(){
	    var win = $(this); //this = window
	    if (win.width() > 1260) {
	    	
	    }
	});
	*/
	if ($(window).width() > 1260) {	
		
		var totalWidth = $('.productView').outerWidth();
		var halfWidth = totalWidth / 2;
		var photoWidth = $('.productView-images.productView-images-large').outerWidth();
		var dataWidth = $('.productView-details-large.product-data').outerWidth();
		
		var leftMargin = photoWidth - halfWidth;
		
		$('.productView-details-large.product-data, .productView-details-large.product-options').css('width', dataWidth);
		
		$(window).scroll(function() {    
		    var scroll = $(window).scrollTop();
		    if (scroll > 168) {
		        $('.productView-details-large.product-data, .productView-details-large.product-options').addClass('productView-details-fixed').css('margin-left', leftMargin);
		    } else {
		        $('.productView-details-large.product-data, .productView-details-large.product-options').removeClass('productView-details-fixed').css('margin-left', '0px');
		    }
			
			var top_of_element = $(".related-similar").offset().top;
			var bottom_of_element = $(".related-similar").offset().top + $(".related-similar").outerHeight();
			var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
			var top_of_screen = $(window).scrollTop();
			
			//if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
			if (bottom_of_screen > top_of_element) {
				$('.productView-details-large.product-data, .productView-details-large.product-options').removeClass('productView-details-fixed').css('margin-left', '0px');
			} else {
				// the element is not visible, do something else
			}
		});
	}
}
