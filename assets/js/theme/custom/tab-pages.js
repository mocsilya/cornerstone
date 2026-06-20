/**
 * Get page content for custom tabs
 * templates > components > products > description.html
 * templates > components > products > description-tabs.html
*/
import utils from '@bigcommerce/stencil-utils';

export default function () {
    // Watch for a click on any of your custom tab titles
    $('.tab-custom1 .tab-title, .tab-custom2 .tab-title, .tab-custom3 .tab-title').click(function(e) {
        e.preventDefault();
        
        // Find the parent tab item container to detect which tab number this is
        const $parentTab = $(this).closest('.tab');
        const href = $(this).attr('href'); // e.g., '#tab-custom1'
        const $targetDiv = $(href);

        // Extract the tab digit dynamically from the class context (e.g., '1' from 'tab-custom1')
        const tabClass = $parentTab.attr('class').match(/tab-custom(\d+)/);
        if (!tabClass) return;
        
        const tabNum = tabClass[1];
        const $pageSource = $(`.tab${tabNum}-page`);

        // Stop execution if the setting is empty, or if the content has already been fetched
        if (!$pageSource.length || $targetDiv.hasClass('content-loaded')) {
            return;
        }

        const rawUrl = $pageSource.html().trim();
        if (!rawUrl) return;

        // Show your loading spinner
        $targetDiv.append('<span class="tab-loader"></span>');

        // FIXED: Uses getPage with the layout override options directly
        utils.api.getPage(rawUrl, { template: 'custom/product-tab-data' }, (err, response) => {
            $targetDiv.find('.tab-loader').remove();

            if (err || !response) {
                console.error(`Failed to load content via API for custom tab ${tabNum}:`, err);
                return;
            }

            // Inject the clean HTML straight into the tab—no manual scraping or parsing required!
            $targetDiv.html(response).addClass('content-loaded');
            
            // Hide the redundant placeholder wrapper if applicable
            $(`.tab-custom${tabNum}:not(.tab)`).hide();
        });
    });
}
