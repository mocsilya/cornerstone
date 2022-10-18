/**
 * Get page content for custom tabs
 * templates > components > products > description.html
 * templates > components > products > description-tabs.html
*/
export default function () {
	if ($('#tab-custom1').length > 0) {
		if ($('.tab1-page').html()) {
			const url1 = $('.tab1-page').html();
			$.ajax({ 
				url: url1, 
				processData : false,
				cache: true,
				success: function(data) {
					const html1 = $.parseHTML( data );
					const content1 = $(html1).find('.page-content').contents();
					if ($(content1).length > 0) { 
					    $('#tab-custom1').append(content1);
					}
				}
			});
		}
	}
	if ($('#tab-custom2').length > 0) {
		if ($('.tab2-page').html()) {
			const url2 = $('.tab2-page').html();
			$.ajax({ 
				url: url2, 
				processData : false,
				cache: true,
				success: function(data) {
					const html2 = $.parseHTML( data );
					const content2 = $(html2).find('.page-content').contents();
					if ($(content2).length > 0) { 
					    $('#tab-custom2').append(content2);
					}
				}
			});
		}
	}
	if ($('#tab-custom3').length > 0) {
		if ($('.tab3-page').html()) {
			const url3 = $('.tab3-page').html();
			$.ajax({ 
				url: url3, 
				processData : false,
				cache: true,
				success: function(data) {
					const html3 = $.parseHTML( data );
					const content3 = $(html3).find('.page-content').contents();
					if ($(content3).length > 0) { 
					    $('#tab-custom3').append(content3);
					}
				}
			});
		}
	}
}
