/**
 * Remove sidebar if not in use
*/
export default function () { 
	if ($('.page-sidebar').length) {
		if ($('.page-sidebar').height() == 0) {
			$('.page-sidebar').remove();
			$('.page-sidebar-toggle').remove();
		}
	} else {
		$('.page-sidebar-toggle').remove();
	}
}
