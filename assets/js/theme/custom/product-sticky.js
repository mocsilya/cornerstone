/**
 * PRODUCT STICKY ADD TO CART
*/

export default function (context) {		
	if ($('div').hasClass('productView-details-sticky')) {
		$(window).on("resize", function () {	
			if ($(window).width() > 1260) {	
				if (!$('.productView-wrap').hasClass('payment-product')){
	
					$('.productView-details-sticky').removeClass('productView-details-fixed').removeClass('productView-details-absolute').removeAttr('style');
	
					var totalWidth = $('.productView').outerWidth();
					var halfWidth = totalWidth / 2;
					var photoWidth = $('.productView-images').outerWidth();
					var dataWidth = $('.productView-details-sticky').outerWidth();
					var dataHeight = $('.productView-details-sticky').outerHeight();
					var screenHeight = $(window).height();
					var leftMargin = photoWidth - halfWidth;
	
					$('.productView-details-sticky').css('width', dataWidth);

					$(window).scroll(function() {   
						if ($(window).width() > 1260) {	 
						    var scroll = $(window).scrollTop();
							if (scroll > 0) {
								var headerHeight = $('header.header').outerHeight();
								if ($('body').hasClass('body-fixed')) {
									$('.productView-details-sticky').addClass('productView-details-fixed').css('margin-left', leftMargin).css('padding-top', headerHeight);
								} else {
									var headerGlobalRegion = $('.header-globalregion').outerHeight();
									var headerBottom = $('div[data-content-region="header_bottom"]').outerHeight();
									var productBelowMenu = $('div[data-content-region="product_below_menu"]').outerHeight();
									var containerHero = $('.container-hero').outerHeight();
									var stickHeight = headerHeight + headerGlobalRegion + headerBottom + productBelowMenu + containerHero;
									console.log('stickheight: ' + stickHeight);
									if (scroll > stickHeight) {
										$('.productView-details-sticky').addClass('productView-details-fixed').css('margin-left', leftMargin);
									}
								}
							} else {
								$('.productView-details-sticky').removeClass('productView-details-fixed').css('margin-left', '0px').css('padding-top', '0px');
							}
							
							var top_of_element = $('div[data-content-region="product_below_bottom_banner"]').offset().top;
							var bottom_of_element = $('div[data-content-region="product_below_bottom_banner"]').offset().top + $('div[data-content-region="product_below_bottom_banner"]').outerHeight();
						
							var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
							var top_of_screen = $(window).scrollTop();
	
							//if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
							if (bottom_of_screen > top_of_element) {
								$('.productView-details-sticky').addClass('productView-details-absolute');
							} else {
								$('.productView-details-sticky').removeClass('productView-details-absolute');
							}
						} else {
							$('.productView-details-sticky').removeClass('productView-details-fixed').removeClass('productView-details-absolute').removeAttr('style');
						}
						/*
						if (document.getElementById('product_question')) {
							var top_of_element = $('#product_question').offset().top;
							var bottom_of_element = $('#product_question').offset().top + $('#product_question').outerHeight();
						} else {
							if (document.getElementsByClassName('related-similar')) {
								var top_of_element = $('.related-similar').offset().top;
								var bottom_of_element = $('.related-similar').offset().top + $('.related-similar').outerHeight();
							} else {
								var top_of_element = $('div[data-content-region="product_below_bottom_banner"]').offset().top;
								var bottom_of_element = $('div[data-content-region="product_below_bottom_banner"]').offset().top + $('div[data-content-region="product_below_bottom_banner"]').outerHeight();
							}
						}
						*/
					});
				}
			} else {
				$('.productView-details-sticky').removeClass('productView-details-fixed').removeClass('productView-details-absolute').removeAttr('style');
			}
		}).resize();
	}
}
