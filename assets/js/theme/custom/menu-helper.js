/**
 * Adds a class to the parent info page in menu.
*/
export default function () { 
	let menuType;
	if ($('.navPages-list').hasClass('navPages-list-simple')) { 
		menuType = "simple";
	} else {
		menuType = "alternate";
	}
	const activePage1 = $('.breadcrumb-menu-1').text();
	const activePage2 = $('.breadcrumb-menu-2').text();
	const activePage3 = $('.breadcrumb-menu-3').text();
	$('.navPages-item-page > .navPages-action').each(function() { 
	    if ($(this).is(':contains('+activePage1+')')) { 
	    	$(this).addClass('activePage');
			if (activePage2 !== '') { 
				$(this).parent().children('div').children('ul').children('li').children('.navPage-subMenu-action:contains('+activePage2+')').addClass('activePage');
			}
			if (menuType == 'simple') { 
				if (activePage3 !== '') {  
					$(this).parent().children('div').children('ul').children('li').children('.navPage-subMenu-action:contains('+activePage2+')').next().find('.navPage-childList-action:contains('+activePage3+')').addClass('activePage');
				}
			} else if (menuType == 'alternate') {
				if (activePage3 !== '') {  
					$(this).parent().children('div').children('ul').children('li').children('.navPage-subMenu-action:contains('+activePage2+')').next().find('.navPage-subMenu-action:contains('+activePage3+')').addClass('activePage');
				}
			}
			
	    }
	});
}
