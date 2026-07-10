/**
 * Get page content for custom tabs
 * templates > components > products > description.html
 * templates > components > products > description-tabs.html
*/
import utils from '@bigcommerce/stencil-utils';

export default function () {
    // Target custom tab navigation elements directly
    $('.tab-custom1 .tab-title, .tab-custom2 .tab-title, .tab-custom3 .tab-title').on('click', function (e) {
        e.preventDefault();
        
        const hrefTarget = $(this).attr('href'); 
        const $targetDiv = $(hrefTarget);
        if (!$targetDiv.length) return;

        let rawUrl = $targetDiv.data('tab-url');
        const $loaderTarget = $targetDiv.find('.tab-content-loader');

        // SAFE GUARD: If there's no URL config, it's a static tab. Stop here.
        if (!rawUrl || rawUrl.trim() === '' || rawUrl.trim() === '/') {
            $targetDiv.removeClass('content-loading').addClass('content-loaded');
            $loaderTarget.empty(); 
            return;
        }

        // Prevent double-fetching if the data is already pulled or actively loading
        if ($targetDiv.hasClass('content-loaded') || $targetDiv.hasClass('content-loading')) {
            return;
        }

        // Apply loading structures and loader container
        $targetDiv.addClass('content-loading');
        $loaderTarget.html('<span class="tab-loader"></span>'); 

        rawUrl = rawUrl.trim();
        const separator = rawUrl.includes('?') ? '&' : '?';
        const apiUrl = `${rawUrl}${separator}layout=page-api-data`;

        // Direct async stream injection
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(htmlPayload => {
                $targetDiv.removeClass('content-loading').addClass('content-loaded');
                
                // Inject pure, server-optimized layout markup instantly
                $loaderTarget.html(htmlPayload);
            })
            .catch(err => {
                $targetDiv.removeClass('content-loading');
                $loaderTarget.empty();
                console.error(`Failed layout data for ${hrefTarget}:`, err);
            });
    });
}