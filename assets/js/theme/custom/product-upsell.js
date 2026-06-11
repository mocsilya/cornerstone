import utils from '@bigcommerce/stencil-utils';

export default function (context) {
    
    // 1. SYNC UI WITH CART ITEMS
    async function updateUpsellStatus() {
        try {
            const res = await fetch('/api/storefront/cart', { credentials: 'include' });
            if (!res.ok) return;
            const data = await res.json();
            const cart = Array.isArray(data) ? data[0] : data;
            if (!cart || !cart.lineItems) return;

            // Map all product IDs in cart (physical + digital)
            const cartProductIds = [
                ...cart.lineItems.physicalItems.map(item => item.productId),
                ...cart.lineItems.digitalItems.map(item => item.productId)
            ];

            $('.upsell-add-button').each(function() {
                const $btn = $(this);
                const productId = $btn.data('product-id');
                const $item = $btn.closest('.upsell-item');

                if (cartProductIds.includes(productId)) {
                    $btn.addClass('is-added').find('.button-text').text('Added!');
                    $item.addClass('upsell-item--added');
                } else {
                    $btn.removeClass('is-added').find('.button-text').text('Add');
                    $item.removeClass('upsell-item--added');
                }
            });
        } catch (err) {
            console.error('Cart sync failed:', err);
        }
    }

    // 2. REUSABLE LOAD FUNCTION
    function loadUpsellItems(productId, $container) {
        if (!productId) return;
        utils.api.product.getById(productId, { template: 'custom/product-upsell-data' }, (err, response) => {
            if (err) return;
            const ids = response.replace(/ +/g, '').split(',').filter(id => id.length > 0);
            
            let loadedCount = 0;
            $.each(ids, (i, id) => {
                utils.api.product.getById(id, { template: 'custom/product-upsell' }, (err, itemHtml) => {
                    if (itemHtml && itemHtml.indexOf("Whoops!") === -1) {
                        $container.append(itemHtml);
                    }
                    loadedCount++;
                    if (loadedCount === ids.length) {
                        updateUpsellStatus(); // Check cart once all items are rendered
                    }
                });
            });
        });
    }

    // 3. PAGE LOAD (Product Page)
    $('.productView-upsell').each(function() {
        loadUpsellItems($(this).data('upsell-id'), $(this));
    });

    // 4. MODAL TRIGGER
    const observer = new MutationObserver(() => {
        const $modal = $('#previewModal');
        const $target = $modal.find('.modal-body .productView');

        if ($modal.hasClass('open') && $target.length && $target.hasClass('productView-upsell-modal') && !$('.productView-upsell-container-modal').length) {
            const currentId = $('[name="product_id"]').val() || $('.productView').data('event-id');
            if (currentId) {
                $target.append(`
                    <div class="productView-upsell-container productView-upsell-container-modal">
                        <div class="productView-upsell" data-upsell-id="${currentId}"></div>
                    </div>
                `);
                loadUpsellItems(currentId, $target.find('.productView-upsell'));
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 5. GLOBAL CLICK HANDLER
    $(document).on('click', '.upsell-add-button', async (e) => {
        const $btn = $(e.currentTarget);
        const pId = $btn.data('product-id');
        if ($btn.hasClass('is-adding') || $btn.hasClass('is-added')) return;

        $btn.addClass('is-adding').find('.button-text').text('Adding...');

        try {
            const cartRes = await fetch('/api/storefront/cart', { credentials: 'include' });
            let cartData = await cartRes.json();
            const cart = Array.isArray(cartData) ? cartData[0] : cartData;
            const cartId = cart ? cart.id : null;
            
            const endpoint = cartId ? `/api/storefront/carts/${cartId}/items` : '/api/storefront/carts';

            const addRes = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ line_items: [{ quantity: 1, product_id: parseInt(pId, 10) }] })
            });

            if (addRes.ok) {
                // Success: Sync UI and Header
                await updateUpsellStatus();
                
                // Refresh Pill
                const updatedCartRes = await fetch('/api/storefront/cart', { credentials: 'include' });
                const updatedData = await updatedCartRes.json();
                const updatedCart = Array.isArray(updatedData) ? updatedData[0] : updatedData;
                
                if (updatedCart && updatedCart.lineItems) {
                    const qty = (updatedCart.lineItems.physicalItems || []).reduce((acc, i) => acc + i.quantity, 0);
                    $('.countPill, .cart-quantity').text(qty).addClass('countPill--positive').show();
                    utils.hooks.emit('cart-item-add-remote', {});
                }
            }
        } catch (err) {
            $btn.removeClass('is-adding').find('.button-text').text('Error');
        }
    });
}
