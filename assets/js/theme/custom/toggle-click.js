/**
 * Open/Close an element with custom toggle link
*/
export default function () {
	if (localStorage.getItem('openToggles') == '#faceted-search-container') {
	    $('#faceted-search-container').addClass('is-open');
		$('a[href="#faceted-search-container"]').addClass('is-clicked');
	}
	if (localStorage.getItem('closedToggles') == '#faceted-search-container') {
	    $('#faceted-search-container').removeClass('is-open');
		$('a[href="#faceted-search-container"]').removeClass('is-clicked');
	}
	$('.toggle-click').click(function(e) {
		e.preventDefault();
		const clickHref = $(this).attr('href');
		if ($(clickHref).hasClass('is-open')) {
			$(clickHref).removeClass('is-open');
			localStorage.removeItem('openToggles', clickHref);
			localStorage.setItem('closedToggles', clickHref);
		} else {
			$(clickHref).addClass('is-open');
			localStorage.setItem('openToggles', clickHref);
			localStorage.removeItem('closedToggles', clickHref);
		}
		$(this).toggleClass('is-clicked');
	});
}
