/**
 * Show/Hide quick search results
*/
export default function () {
    $('.navUser-item--boxsearch #nav-quick-search').keydown(function() {
		const $dropdown = $('#quickSearch');
        $dropdown.addClass('is-open f-open-dropdown');
        $dropdown.attr('aria-hidden', 'false');
    });
	
	$('#quickSearch').on('click', '.modal-close', function() {
	    $('#nav-quick-search').val('').trigger('input');
	    $('.quickSearchResults').html('');
	});
	
	$('#quick-search-expand').on('click', function() {
	    if ($(this).attr('aria-expanded') === 'true') {
	        $('#nav-quick-search').val('').trigger('input');
	        $('.quickSearchResults').html('');
	    }
	});
}