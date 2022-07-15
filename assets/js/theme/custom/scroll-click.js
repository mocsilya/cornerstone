/**
 * Scroll to an ID when clicked
*/
export default function () { 
	$(".scroll-click").click(function(e) {
		const dpr = window.devicePixelRatio;
		const headerHeight = 90 * dpr;
		const id = $(this).attr('href');
	    const $id = $(id);
	    if ($id.length === 0) {
	        return;
	    }
		e.preventDefault();
	    const pos = $id.offset().top - headerHeight;
	    $('body, html').animate({scrollTop: pos});
	});
}
