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
				$(html).find('label.form-option-swatch').each(function() {
					$(swatches).append(this);
		    	});
			}
		});		
	});

    // Check if content has changed
	if (!$("body").hasClass("page-product")) {
	    var target = document.querySelector("#product-listing-container");
	    var observer = new MutationObserver(function(mutations) {
			$('.figure__swatches').each(function() {
				const url = $(this).attr('href');
				const swatches = $(this).parent().next('.card-body').find('.card-swatches');
				$.ajax({ 
					url: url, 
					processData : false,
					cache: true,
					success: function(data) {
						const html = $.parseHTML( data );
						$(html).find('label.form-option-swatch').each(function() {
							$(swatches).append(this);
				    	});
					}
				});		
			});
	    });
	    var config = { attributes: true, childList: true, characterData: true };
	    observer.observe(target, config);
	}
}
