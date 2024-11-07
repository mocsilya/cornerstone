/**
 * Custom global client js
*/
export default function () { 
	$(".cart-terms-click").click(function(e) {
		e.preventDefault();
		$(".cart-terms").hide();
	});
}
