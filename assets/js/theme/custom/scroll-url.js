/**
 * Scroll to an ID when in URL
*/
export default function () { 
	
	if (localStorage.hasOwnProperty('scroll-url')) {
		const id = localStorage.getItem('scroll-url');
		if ($(id).length) {
			const dpr = window.devicePixelRatio;
			const headerHeight = 90 * dpr;
		    const $id = $(id);
		    if ($id.length === 0) {
		        return;
		    }
			const pos = $id.offset().top - headerHeight;
		    $('body, html').animate({scrollTop: pos});
			localStorage.removeItem('scroll-url');
		}
	}
	
	$(".scroll-url").click(function() {
		const scrollUrl = $(this).data('scroll-url');
		localStorage.setItem('scroll-url', scrollUrl);
	});
	
}

	
