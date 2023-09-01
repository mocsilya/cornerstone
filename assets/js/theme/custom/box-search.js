/**
 * Show/Hide quick search results
*/
export default function () {
    $('.form-search-box #nav-quick-search').keydown(function() {
        $('.dropdown--quickSearch').addClass('is-open f-open-dropdown');
		$('.dropdown--quickSearch').attr('aria-hidden', false);
    });
	
	$(".navUser-action--boxSearch").click(function() {
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
			$('.container-search-box').removeClass('is-open');
		} else {
			$(this).attr('aria-expanded', true);
			$('.container-search-box').addClass('is-open');
		}
	});
}