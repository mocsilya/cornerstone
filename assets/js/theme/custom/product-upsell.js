/**
 * PRODUCT UPSELL
*/

import utils from '@bigcommerce/stencil-utils';
import { defaultModal, ModalEvents } from '../global/modal';

export default function (context) {
    const $container = $('.productView-upsell');
    const productId = $container.length ? $container.data('upsell-id') : 0;

    // 1. LOAD THE PRODUCTS
    if (productId !== 0) {
        utils.api.product.getById(productId, { template: 'custom/product-upsell-data' }, (err, response) => {
            if (err) return;
            const array = response.replace(/ +/g, '').split(',').filter(id => id.length > 0);

            $.each(array, function(i, Id) {
                utils.api.product.getById(Id, { template: 'custom/product-upsell' }, (err, response) => {
                    if (response && response.indexOf("Whoops!") === -1) {
                        $container.append(response);
                    }
                });
            });
        });
    }

    // 2. BULK ADD HANDLER
	$('#bulk-add-upsells').on('click', async (event) => {
	    const $selected = $('input[name="upsell_check"]:checked');
	    const $btn = $(event.currentTarget);

	    if (!$selected.length) {
	        alert('Please select at least one item.');
	        return;
	    }

	    $btn.attr('disabled', true).text('Adding...');

	    const lineItems = $selected.map((i, el) => ({
	        quantity: 1,
	        product_id: parseInt($(el).val(), 10)
	    })).get();

	    try {
	        // 1. Your exact cart fetch logic
	        const cartRes = await fetch('/api/storefront/cart', { credentials: 'include' });
	        let cartData = null;
	        if (cartRes.ok) {
	            cartData = await cartRes.json();
	        }

	        // 2. Your exact cartId determination
	        const cartId = (Array.isArray(cartData) && cartData.length > 0) 
	            ? cartData[0].id 
	            : (cartData ? cartData.id : null);

	        let addRes;
	        if (cartId) {
	            addRes = await fetch(`/api/storefront/carts/${cartId}/items`, {
	                method: 'POST',
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify({ line_items: lineItems })
	            });
	        } else {
	            addRes = await fetch('/api/storefront/carts', {
	                method: 'POST',
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify({ line_items: lineItems })
	            });
	        }

	        // 3. New logic: Only proceed if the ADD was successful
			if (addRes.ok) {
			    // 1. Update the header mini-cart counter
			    utils.api.cart.getCart({}, (err, response) => {
			        utils.hooks.emit('cart-item-add-remote', response);
			    });

			    // 2. Open the Modal with a custom message
			    

			    // 3. Clear the checkboxes
			    $selected.prop('checked', false);
			}
			
			if (addRes.ok) {
			    // 1. Update the header/mini-cart counter using Storefront API
			    fetch('/api/storefront/cart', { credentials: 'include' })
			        .then(res => res.json())
			        .then(data => {
			            // Handle both array and object responses
			            const cart = Array.isArray(data) ? data[0] : data;
			            if (!cart || !cart.lineItems) return;

			            // Sum up quantities from all item types
			            const physicalQty = cart.lineItems.physicalItems.reduce((acc, item) => acc + item.quantity, 0);
			            const digitalQty = cart.lineItems.digitalItems.reduce((acc, item) => acc + item.quantity, 0);
			            const totalQty = physicalQty + digitalQty;

			            // Update DOM: Targeting standard Stencil pill classes
			            const $pill = $('.countPill, .cart-quantity');
			            $pill.text(totalQty);

			            if (totalQty > 0) {
			                $pill.addClass('countPill--positive').show();
			            }
            
			            // Still emit the hook so other components (like mini-cart) can refresh if they want
			            utils.hooks.emit('cart-item-add-remote', {});
			        })
			        .catch(err => console.error('Pill update failed:', err));

			    // 2. Open the Modal with a custom message
			    if (typeof defaultModal === 'function') {
			        const modal = defaultModal();

			        const successHtml = `
			            <div class="modal-header">
			                <h2 class="modal-header-title">Success!</h2>
			            </div>
			            <div class="modal-body" style="text-align: center; padding: 20px;">
			                <p>Items have been successfully added to your cart.</p>
			                <div class="modal-actions" style="margin-top: 20px;">
			                    <a href="/cart.php" class="button button--primary">View Cart</a>
			                    <button type="button" id="close-upsell-modal" class="button">Continue Shopping</button>
			                </div>
			            </div>
			        `;

			        modal.open();
			        $('#modal').html(successHtml);

			        $('#close-upsell-modal').on('click', () => {
			            modal.close();
			        });
			    }

			    // 3. Clear the checkboxes for a clean UI
			    $selected.prop('checked', false);
			} else {
	            const errorData = await addRes.json();
	            console.error('API rejected items:', errorData);
	            alert('Some items could not be added. They may be out of stock.');
	        }

	    } catch (err) {
	        console.error('Add to cart failed', err);
	        alert('There was an issue updating your cart.');
	    } finally {
	        $btn.attr('disabled', false).text('Add Selected to Cart');
	    }
	});
	
    
}


