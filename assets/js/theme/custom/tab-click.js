/**
 * Open a tab with custom link
*/
export default function () { 
	$(".tab-click").click(function () {
		const clickHref = $(this).attr("href");
		const dpr = window.devicePixelRatio;
		const headerHeight = $('.header').outerHeight() * dpr;
		$(clickHref).siblings().removeClass('is-active');
		$(clickHref).addClass('is-active');
		$(".tab").each(function (){
		    $(this).find('a[href="'+clickHref+'"]').parent().addClass('is-active').siblings().removeClass('is-active');
		});
		$('html').animate({
			scrollTop: $(clickHref).offset().top - headerHeight},'slow');
		});
}
