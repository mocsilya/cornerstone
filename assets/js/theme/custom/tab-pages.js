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

        const apiUrl = rawUrl.trim();

        // Direct async stream injection
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(htmlPayload => {
                $targetDiv.removeClass('content-loading').addClass('content-loaded');

                // 1. Parse the string into an accessible DOM structure
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlPayload, 'text/html');

                // 2. Extract just the inner content of your main container
                const cleanContent = doc.querySelector('.page-content')?.innerHTML;

                // 3. Inject only the extracted layout markup, or fallback safely to a link
                if (cleanContent) {
                    $loaderTarget.html(cleanContent);
                } else {
                    console.error(`Target selector '.page-content' not found in fetched HTML for ${hrefTarget}`);
                    $loaderTarget.html(`<p>To learn more <a href="${apiUrl}" target="_blank">View details here</a>.</p>`); 
                }
            })
            .catch(err => {
                $targetDiv.removeClass('content-loading');
                console.error(`Failed layout data for ${hrefTarget}:`, err);
                // Fail-safe link fallback if the network request fails or 404s
                $loaderTarget.html(`<p>Failed to load details. <a href="${apiUrl}" target="_blank">View details here</a>.</p>`);
            });
    });
}