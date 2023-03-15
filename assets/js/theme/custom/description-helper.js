/**
 * Remove sidebar if not in use
*/
export default function () { 
	if ($('.category-description-trim').height() > 130) {
		$('.category-description-trim').addClass('is-closed');
		$('.category-description-button').show();
	}
	$('.category-description-button').click(function(e) {
		e.preventDefault();
		$('.category-description-trim').toggleClass('is-closed');
		if ($(this).hasClass('is-open')) {
			$(this).removeClass('is-open');
		} else {
			$(this).addClass('is-open');
		}
	});
}
