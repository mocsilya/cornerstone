/**
 * Adds warranty data to product cards via Stencil Utility API.
 * templates > components > products > card.html
*/
import utils from '@bigcommerce/stencil-utils';

export default function () {	
    $('.card-warranty .button').on('click', function(e) {
        e.preventDefault();
        
        const $button = $(this);
        const productId = $button.data('product-id'); 
        const $dropdown = $(`#warranty${productId}`);
        
        if (!$dropdown.length) return;
        
        // Only fetch if the dropdown doesn't have data yet
        if ($dropdown.children().length === 0 || $dropdown.text().trim() === '') {
            $dropdown.html('<span class="loading">Loading...</span>');
            
            // Fetch the isolated template snippet from the server
            utils.api.product.getById(productId, { template: 'custom/card-warranty-data' }, (err, response) => {
                if (err) {
                    $dropdown.html('<span class="error">Error loading data.</span>');
                    return;
                }
                
                // If the response contains actual text/html content, inject it directly
                if (response && response.trim() !== "") { 
                    $dropdown.html(response);
                } else {
                    $dropdown.html('<span class="no-data">No data found.</span>');
                }
            });
        }	
    });
}