/**
 * Adds a class to the parent info page in menu.
*/
export default function () {
	const activePage1 = $('.breadcrumb-menu-1').text();
	const activePage2 = $('.breadcrumb-menu-2').text();
	const activePage3 = $('.breadcrumb-menu-3').text();
	$('.navPages-item-page > .navPages-action').each(function() {
	    if ($(this).is(':contains('+activePage1+')')) {
	    	$(this).addClass('activePage');
			if (activePage2 !== ''){ 
				$(this).next().find('.navPage-subMenu-action:contains('+activePage2+')').addClass('activePage');
			}
			if (activePage3 !== ''){ 
				$(this).next().find('.navPage-subMenu-action:contains('+activePage2+')').next().find('.navPage-childList-action:contains('+activePage3+')').addClass('activePage');
			}
	    }
	});
}
