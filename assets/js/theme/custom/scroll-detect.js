/**
 * Adds a class to the body when the postion of the page isn't 0px.
*/
export default function () {
	$(window).scroll(function() {    
	    var scroll = $(window).scrollTop();
	    if (scroll > 0) {
	        $('body').addClass('scroll');
	    } else {
	        $('body').removeClass('scroll');
	    }
	});
}
