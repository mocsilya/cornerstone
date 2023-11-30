/**
 * Adds swatches to product cards.
 * templates > components > products > card.html
*/
export default function () {	
	$('.card-warranty .button').click(function(e) {
		e.preventDefault();
		const url = $(this).data('warranty-url');
		const warranty = $(this).parent();
		const dropdown = $(warranty).find('.dropdown-wrap');
		if (!$(dropdown).html().length > 0) {
			$(dropdown).append('Loading...');
			$.ajax({ 
				url: url, 
				processData : false,
				cache: true,
				success: function(data) {
					const html = $.parseHTML( data );
					const content = $(html).find('.warranty-content').contents();
					if ($(content).length > 0) { 
					    $(dropdown).html(content);
					} else {
						$(dropdown).html('No data found.');
					}
				}
			});
		}	
	});
}
/*
export default function () {
	$('.figure__warranty').each(function() {
		const url = $(this).attr('href');
		const warranty = $(this).parent().next('.card-body').find('.card-warranty');
		$.ajax({ 
			url: url, 
			processData : false,
			cache: true,
			success: function(data) {
				const html = $.parseHTML( data );
				const content = $(html).find('.warranty-content').contents();
				if ($(content).length > 0) { 
				    $(warranty).find('.dropdown-wrap').append(content);
					$(warranty).show();
				}
			}
		});		
	});
}
*/
