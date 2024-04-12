/**
 * Custom global client js
*/

export default function () {
	if (localStorage.getItem('flyoutBanner') == '#flyoutShow') {
	    $('#flyoutBanner').addClass('is-open');
	}
	if (localStorage.getItem('flyoutBanner') == '#flyoutHide') {
	    $('#flyoutBanner').removeClass('is-open');
	}
	
	$('.flyout-click').click(function(e) {
		e.preventDefault();
		const clickHref = $(this).attr('href');
		if ($('#flyoutBanner').hasClass('is-open')) {
			$('#flyoutBanner').removeClass('is-open');
			localStorage.removeItem('flyoutBanner');
			localStorage.setItem('flyoutBanner', clickHref);
		} else {
			$('#flyoutBanner').addClass('is-open');
			localStorage.removeItem('flyoutBanner');
			localStorage.setItem('flyoutBanner', clickHref);
		}
	});
}
