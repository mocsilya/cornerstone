/**
 * Custom global client js
*/
export default function () { 
	$('.navPages-item-e-liquids .navPage-subMenu-item').hover(function() {     
		$('.navPages-item-e-liquids .navPage-childList').removeClass('sfHover');
		$('.navPages-item-e-liquids .navPage-subMenu-item').removeClass('sfHover');
		$(this).closest('div').removeClass('flavourHover');
		$(this).addClass('sfHover');
		$(this).children('.navPage-childList').addClass('sfHover');
		if ($(this).hasClass('navPage-subMenu-flavours')) {
			$(this).closest('div').addClass('flavourHover');
		}
	});
}
