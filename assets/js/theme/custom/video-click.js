/**
 * Open a tab with custom link
*/
export default function () { 
	$('.video-click').click(function(e) {
		e.preventDefault();
		$('html').animate({ scrollTop: 0 }, 'slow');
		if ($('.video-click').hasClass('clicked')) {
			$('.video-click').removeClass('clicked');
			$('.video-click .toggleLink-text--on').hide();
			$('.video-click .toggleLink-text--off').show();
			$('#videoGallery-content').removeClass('is-open');
			$('.productView-image').addClass('is-open');
			$('.productView-thumbnails').removeClass('disabled');
		} else {
			$('.video-click').addClass('clicked');
			$('.video-click .toggleLink-text--on').show();
			$('.video-click .toggleLink-text--off').hide();
			$('#videoGallery-content').addClass('is-open');
			$('.productView-image').removeClass('is-open');
			$('.productView-thumbnails').addClass('disabled');
		}
	});
}
