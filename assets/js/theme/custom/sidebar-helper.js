/**
 * Remove sidebar if not in use
*/
export default function () { 
	if ($('.page-sidebar').height() == 0) {
		$('.page-sidebar').remove();
	}
}
