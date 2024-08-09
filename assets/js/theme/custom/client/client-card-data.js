/**
 * Custom card data js
*/

export default function ( data ) {
    if (data) {
    	//console.log('[data]: ', data);
		let i = 0;
		while (i < data.length) {
		    console.log(data[i]);
			//console.log("Id: " + data[i].id);
			//console.log("Name: " + data[i].productName);
			const div = document.querySelector('.custom-product-data[data-product-id="' + data[i].id + '"]');
			
			// Create the div for the html
			const table = document.createElement("div");
			table.className = "data-table";
			
			let j = 0;
			while (j < data[i].productVariant.length) {
				
				//Create the div for the html
				const tr = document.createElement("div");
				tr.className = "data-tr";
				
				// Variant Sku
				const sku = data[i].productVariant[j].sku;
				
				// Variant Pricing
				const saleCheck = data[i].productVariant[j].prices.salePrice;
				let price;
				if (!saleCheck == null) {
					price = data[i].productVariant[j].prices.salePrice.formatted;
				} else {
					price = data[i].productVariant[j].prices.price.formatted;
				}
				
				// Product Variant Options
				let optionName;
				let optionValue;
				let k = 0;
				while (k < data[i].productVariant[j].options.edges.length) {
					
					optionName = data[i].productVariant[j].options.edges[k].node.displayName;
					optionValue = data[i].productVariant[j].options.edges[k].node.values.edges[0].node.label;
					
				    k++;
				}
				
				tr.innerHTML = '<div class="td td-sku">'+ sku +'</div>' +
				'<div class="td td-option">'+ optionValue +'</div>' +
				'<div class="td td-price">'+ price +'</div>';

			    table.appendChild(tr);
				div.append(table);
				
			    j++;
			}
			
		    i++;
		}
    }
}
