/**
 * Adds swatches to product cards.
 * templates > components > products > card.html
*/
export default function () {
	$('.figure__swatches').each(function() {
		const url = $(this).attr('href');
		const swatches = $(this).parent().next('.card-body').find('.card-swatches');
		$.ajax({ 
			url: url, 
			processData : false,
			cache: true,
			success: function(data) {
				const html = $.parseHTML( data );
				$(html).find('span.form-option-variant').each(function() {
					if ($(this).hasClass('form-option-variant--pattern')){
						$(swatches).append(this);
					} else if ($(this).hasClass('form-option-variant--color')){
						$(swatches).append(this);
					}
		    	});
			}
		});		
	});
}
