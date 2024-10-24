/**
 * Open a tab with custom link
*/
export default function () { 
	$('.tab-click').click(function () {
		const clickHref = $(this).attr('href');
		const dpr = window.devicePixelRatio;
		const headerHeight = $('.header').outerHeight() * dpr;
		$(clickHref).siblings().removeClass('is-active');
		$(clickHref).addClass('is-active');
		$('.tab').each(function (){
		    $(this).find('a[href="'+clickHref+'"]').parent().addClass('is-active').siblings().removeClass('is-active');
		});
		$('html').animate({scrollTop: $(clickHref).offset().top - headerHeight},'slow');
		if (clickHref == '#tab-custom1') {
			if ($('.tab1-page').html()) {
				const url1 = $('.tab1-page').html();
				$('#tab-custom1').append('<span class="tab-loader"></span>');
				$.ajax({ 
					url: url1, 
					processData : false,
					cache: true,
					success: function(data) {
						const html1 = $.parseHTML( data );
						const content1 = $(html1).find('.page-content').contents();
						if ($(content1).length > 0) {
						    $('#tab-custom1').html(content1);
							$('.tab-custom1:not(.tab)').hide();
						}
					}
				});
			}
		}
		if (clickHref == '#tab-custom2') {
			if ($('.tab2-page').html()) {
				const url2 = $('.tab2-page').html();
				$('#tab-custom2').append('<span class="tab-loader"></span>');
				$.ajax({ 
					url: url2, 
					processData : false,
					cache: true,
					success: function(data) {
						const html2 = $.parseHTML( data );
						const content2 = $(html2).find('.page-content').contents();
						if ($(content2).length > 0) {
						    $('#tab-custom2').html(content2);
							$('.tab-custom2:not(.tab)').hide();
						}
					}
				});
			}
		}
		if (clickHref == '#tab-custom3') {
			if ($('.tab3-page').html()) {
				const url3 = $('.tab3-page').html();
				$('#tab-custom3').append('<span class="tab-loader"></span>');
				$.ajax({ 
					url: url3, 
					processData : false,
					cache: true,
					success: function(data) {
						const html3 = $.parseHTML( data );
						const content3 = $(html3).find('.page-content').contents();
						if ($(content3).length > 0) {
						    $('#tab-custom3').html(content3);
							$('.tab-custom3:not(.tab)').hide();
						}
					}
				});
			}
		}
		
	});
}
