/**
 * PRODUCT UPSELL
*/

import utils from '@bigcommerce/stencil-utils';

export default function (context) {		
	if ($('.productView-upsell').length) {
		var productId = $('.productView-upsell').data('upsell-id');
	} else {
		var productId = 0;
	}
	//console.log(productId);
	if (productId !== 0) { 
		utils.api.product.getById(productId, { template: 'custom/product-upsell-data' }, (err, response) => {
			if (err) return;			
			const idList = response.replace( / +/g, '');
			//console.log(idList);
			const array = idList.split(',');
			//console.log(array);
			$.each(array, function(i, Id){ 
			   	utils.api.product.getById(Id, { template: 'custom/product-upsell' }, (err, response) => {
					if (response.indexOf("Whoops! - Page not found") > -1) {
						console.log("Upsell Item: 404 Not Found");
					} else {
						if (!$.trim(response)){   
						    console.log("Upsell Item: Data Not Loaded");
						} else {   
							$('.productView-upsell').append(response);
						}
					}			
				})
			});
		})
	}
}

/*
OLD VERSION - DEBUG CONTEXT DOES NOT WORK ON LIVE

export default function (context) {	
	
	if ($('.productView-upsell').length){
		var productId = $('.productView-upsell').data('upsell-id');
	} else {
		var productId = 0;
	}
	if (productId !== 0) { 
		utils.api.product.getById(productId, { params: { debug: "context" }}, (err, response) => {

				const imageSize = '600x600';
				const imageUrl = response.product.main_image.data.replace('{:size}', imageSize);
		        console.log('Title:', response.product.title);
				console.log('Brand:', response.product.brand.name);
				console.log('Brand URL:', response.product.brand.url);
				console.log('Product URL:', response.product.url);
				console.log('Price:', response.product.price);
				console.log('Image:', imageUrl);
				console.log('Sale:', response.product.price.sale_price_with_tax.formatted);
				console.log(response.product);
				var i = 0;
				$(response.product.custom_fields).each(function() {
					if (response.product.custom_fields[i].name === '_upsell') {
						const idList = response.product.custom_fields[i].value;
						const array = idList.split(',');
						$.each(array, function(i, Id){
						   	utils.api.product.getById(Id, { template: 'custom/product-upsell' }, (err, response) => {
						   			$('.productView-upsell').append(response);
						   	    }
						   	)
						});
					}
					i++;
				});
		    }
		)
	}
}
*/