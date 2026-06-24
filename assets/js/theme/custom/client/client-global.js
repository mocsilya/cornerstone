/**
 * Custom global client js
*/

export default function () {
    // 1. GLOBAL GUARD: Instantly exit if we are not on the product page
    if (!document.body.classList.contains('page-product')) return;

    // 2. THE LAYOUT ENGINE
    function runLayoutUpdate() {
        const container = document.querySelector('.productView');
        if (!container) return;

        const dataDiv = container.querySelector('.productView-details.product-data');
        const optionsDiv = container.querySelector('.productView-details.product-options');
        
        if (!dataDiv || !optionsDiv) return;

        const targetWidth = 1260;
        const isDesktop = window.innerWidth > targetWidth;
        let wrapper = container.querySelector('.productView-right-column-wrapper');

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

    // 3. LISTENERS INSIDE CLOSING BRACKET
    // Run the engine immediately on page load
    runLayoutUpdate();
    
    // Watch for browser resizing live
    window.addEventListener('resize', runLayoutUpdate);
}