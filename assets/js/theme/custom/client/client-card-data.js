/**
 * Custom card data js
*/

export default function ( data ) {
    if (data) {
		let i = 0;
		while (i < data.length) {
		    console.log(data[i]);
			const card = document.querySelector('.card[data-entity-id="' + data[i].id + '"]');
			const cardPrice = card.querySelector('.price.price--withTax');
			const cardPriceFormatted = cardPrice.innerHTML;
			const cardData = document.querySelector('.custom-product-data[data-product-id="' + data[i].id + '"]');
			const cardMessage = cardData.previousElementSibling;
			const cardMessagePrice = cardMessage.querySelector('.card-message-price');
			let cardMessageVal;
			if (cardMessagePrice) {
				cardMessageVal = cardMessagePrice.getAttribute('data-price-value');
			} else {
				cardMessageVal = 0;
			}
			console.log('cardMessageVal: ' + cardMessageVal);
			let j = 0;
			while (j < data[i].productVariant.length) {				
				if (j < 1) {
					// Variant Pricing
					const saleCheck = data[i].productVariant[j].prices.salePrice;
					let price;
					let priceVal;
					if (!saleCheck == null) {
						price = data[i].productVariant[j].prices.salePrice.formatted;
						priceVal = data[i].productVariant[j].prices.salePrice.value;
					} else {
						price = data[i].productVariant[j].prices.price.formatted;
						priceVal = data[i].productVariant[j].prices.price.value;
					}
					
					if (cardMessageVal > 0) {
						if (priceVal < cardMessageVal) {
							console.log("default="+ cardMessageVal +" ... var="+ priceVal + "variant price is less than default");
							cardMessagePrice.innerHTML = "RRP: <s>"+cardPriceFormatted+"</s>";
							cardPrice.innerHTML = price;
							
						}
					}
				}
			    j++;
			}
		    i++;
		}
    }
}
