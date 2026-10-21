/**
 * Adds a class to the body when the position of the page exceeds the threshold.
*/
export default function () {
	$(window).scroll(function() {    
	    var scroll = $(window).scrollTop();
	    var threshold = $('body').hasClass('with-bar') ? 42 : 0;

	    if (scroll > threshold) {
	        $('body').addClass('scroll');
	    } else {
	        $('body').removeClass('scroll');
	    }
	});
}
