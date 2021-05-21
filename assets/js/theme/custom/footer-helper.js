/**
 * Counts the footer columns and adds a class.
*/
export default function () { 
	const footerColumns = $('.footer-info-col').length;
	const footerClass = 'footer-info-' + footerColumns;
	$('.footer-info').addClass(footerClass);
}
