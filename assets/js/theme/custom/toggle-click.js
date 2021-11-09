/**
 * Open/Close an element with custom toggle link
*/
export default function () { 
	$('.toggle-click').click(function(e) {
		e.preventDefault();
		const clickHref = $(this).attr("href");
		$(clickHref).toggleClass('is-open');
		$(this).toggleClass('is-clicked');
	});
}
