import $ from 'jquery';
	
$(document).ready(function() {
	$('.card-figure__swatches').each(function() {
		const url = $(this).attr('href');
		const swatches = $(this).parent().next('.card-body').children('.card-swatches');
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
});
