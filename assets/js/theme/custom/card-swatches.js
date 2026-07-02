/**
 * Adds swatches to product cards.
 * templates > components > products > card.html
*/
import utils from '@bigcommerce/stencil-utils';

export default function (key, productIdArray) {
	
	// 1. Swatch Check - Are swatches turned on?
	const $swatchContainers = $('.card-swatches');
	if (!$swatchContainers.length) {
		console.log('Swatches: Switched Off');
		return;
	}
	
	// 2. Data Check - Is there data for the query?
	const arrayLength = productIdArray ? productIdArray.length : 0;
	if (!key || arrayLength === 0) {
		console.log('Swatches: Missing key or no products to fetch.');
		return;
	}
	
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
            query: `query getSwatches {
                site {
                    products(first: ${arrayLength}, entityIds: [${String(productIdArray)}]) {
                        edges {
                            node {
                                entityId
                                productOptions(first: 10) { 
                                    edges {
                                        node {
                                            displayName
                                            ... on MultipleChoiceOption {
                                                values {
                                                    edges {
                                                        node {
                                                            label
                                                            ... on SwatchOptionValue {
                                                                hexColors
                                                                imageUrl(width: 40)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }`
        }),
    })
    .then(res => res.json())
    .then(response => {
        if (!response?.data) return; // Added optional chaining guard here

        // Loop through each product returned by GraphQL
        response.data.site.products.edges.forEach(({ node }) => {
            // 1. Find the specific card's swatch container
            const $target = $(`[data-entity-id="${node.entityId}"]`).find('.card-swatches');
            
            if (!$target.length) return;

			// 2. Find the "Color" option in the product data
			const colorOption = node.productOptions?.edges?.find(opt => { // Added optional chaining guard here
			    const name = opt.node.displayName.toLowerCase();
		 	   	return name.includes('color') || name.includes('colour') || name.includes('swatch') || name.includes('pattern') || name.includes('finish') || name.includes('material') || name.includes('shade') || name.includes('tone') || name.includes('fabric') || name.includes('texture') || name.includes('print');
			});

			if (colorOption && colorOption.node?.values?.edges) { // Added conditional guard here
			    // 3. Build the HTML for each swatch value
			    const swatchHtml = colorOption.node.values.edges.map(({ node: val }) => {
			        const isImage = !!val.imageUrl;
			        const labelClass = 'form-option form-option-swatch';
        
			        let variantHtml = '';

			        if (isImage) {
			            // IMAGE STRUCTURE
			            variantHtml = `
			                <span class="form-option-variant form-option-variant--pattern" 
			                      title="${val.label}" 
			                      style="background-image: url('${val.imageUrl}');">
			                </span>`;
			        } else {
			            // SINGLE & MULTI COLOUR STRUCTURE
			            // Fixed: Added optional chaining and fallback empty array so it safely skips undefined hex arrays
			            variantHtml = (val.hexColors || []).map(color => `
			                <span class="form-option-variant form-option-variant--color" 
			                      title="${val.label}" 
			                      style="background-color: ${color}">
			                </span>
			            `).join('');
			        }

                    // Only return a template layout if we actually generated inner variants
                    if (variantHtml === '') return '';

			        return `
			            <label class="${labelClass}">
			                <span class="form-option-variant--wrap">
			                    ${variantHtml}
			                </span>
			            </label>`;
			    }).join('');

			    // 4. Inject the HTML into the div
			    $target.html(swatchHtml);
			}
            
        });
    })
    .catch(err => console.error('GraphQL Error:', err));
}