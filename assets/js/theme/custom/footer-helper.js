/**
 * Counts blog posts and hides if empty.
 * Counts the footer columns and adds a class.
*/
export default function () { 
	const blogPosts = $('.footer-blog-list li').length;
	const footerColumns = $('.footer-info-col').length;
	const footerClass = 'footer-info-' + footerColumns;
	if (blogPosts === 0) { 
		if ($('.footer-blog').length) {
			$('.footer-blog').hide();
		}
	}
	$('.footer-info').addClass(footerClass);
}
