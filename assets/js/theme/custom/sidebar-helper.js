/**
 * Remove sidebar if not in use
*/
export default function () { 
	if ($('body:not(.page-page) .page-sidebar').length) {
		if ($('.page-sidebar').height() == 0) {
			$('.page-sidebar').remove();
			$('.page-sidebar-toggle').remove();
		}
	} else {
		$('.page-sidebar-toggle').remove();
	}
}
