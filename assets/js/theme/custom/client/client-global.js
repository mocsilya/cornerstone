/**
 * Custom global client js
*/

export default function () {
    // 1. THE LAYOUT ENGINE
    function runLayoutUpdate(container) {
        if (!container) return;

        const dataDiv = container.querySelector('.productView-details.product-data');
        const optionsDiv = container.querySelector('.productView-details.product-options');
        
        if (!dataDiv || !optionsDiv) return;

        const targetWidth = 800;
        const isDesktop = window.innerWidth > targetWidth;
        let wrapper = container.querySelector('.productView-right-column-wrapper');

        // Early return if state hasn't changed to avoid unnecessary DOM work
        if (isDesktop && wrapper) return;
        if (!isDesktop && !wrapper) return;

        if (isDesktop && !wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'productView-right-column-wrapper';
            dataDiv.parentNode.insertBefore(wrapper, dataDiv);
            wrapper.appendChild(dataDiv);
            wrapper.appendChild(optionsDiv);

        } else if (!isDesktop && wrapper) {
            const bottomRegion = container.querySelector('div[data-content-region="product_view_bottom"]');

            if (bottomRegion) {
                container.insertBefore(dataDiv, bottomRegion);
                container.insertBefore(optionsDiv, bottomRegion);
            } else {
                container.appendChild(dataDiv);
                container.appendChild(optionsDiv);
            }

            wrapper.remove();
        }
    }

    // 2. HELPER TO UPDATE ALL ACTIVE PRODUCT VIEWS
    function updateAllViews() {
        document.querySelectorAll('.productView').forEach(container => {
            runLayoutUpdate(container);
        });
    }

    // 3. RUN IMMEDIATELY ON INITIAL PAGE LOAD
    updateAllViews();

    // 4. OBSERVE MODALS (WITH LOOP PREVENTION)
    let isUpdatingModal = false;
    const modalElement = document.getElementById('modal') || document.body;

    const observer = new MutationObserver(() => {
        // Prevent observing our own DOM modifications
        if (isUpdatingModal) return;

        const modalProductView = modalElement.querySelector('.productView');
        if (modalProductView) {
            isUpdatingModal = true;
            runLayoutUpdate(modalProductView);
            // Release lock on next tick after DOM updates complete
            setTimeout(() => { isUpdatingModal = false; }, 0);
        }
    });

    observer.observe(modalElement, { childList: true, subtree: true });

    // 5. THROTTLED RESIZE LISTENER (Debounce for performance)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateAllViews, 50);
    });
}
