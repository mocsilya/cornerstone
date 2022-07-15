/**
 * Open a tab when there's a hash in URL
*/
export default function () { 
	if (window.location.hash) {
		const hashHref = window.location.hash;
		const dpr = window.devicePixelRatio;
		const headerHeight = $('.header').outerHeight() * dpr;
		$(hashHref).siblings().removeClass('is-active');
		$(hashHref).addClass('is-active');
		$('.tab').each(function (){
		    $(this).find('a[href="'+hashHref+'"]').parent().addClass('is-active').siblings().removeClass('is-active');
		});
		$('html').animate({
			scrollTop: $(hashHref).offset().top - headerHeight},'slow');
	}
}
