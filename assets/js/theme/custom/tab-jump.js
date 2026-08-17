/**
 * Stop product tabs from jumping on mobile and handle accordion toggle.
 * Location: assets/js/theme/custom/tab-jump.js
*/

export default function () {
    const $tabsGrid = $('.tabs-grid');
    const $tabs = $tabsGrid.find('.tab');
	const $article = $tabsGrid.parent('article');
	const isUnderneath = $article.hasClass('productView-description-underneath');
	const isSideSmall = $article.hasClass('productView-description-side') && $article.hasClass('productView-description-small');
	const isSideMedium = $article.hasClass('productView-description-side') && $article.hasClass('productView-description-medium');
	
	// --- 1. Check a tab is open on load (failsafe for products without a description) ---
	const tabCheck = $tabs.hasClass('is-active');
    if (!tabCheck && $tabs.length) {
        $tabs.first().find('.tab-title').trigger('click');
    }
	
    // --- 2. Handle Responsive Orientation / Window Resizing ---
    $(window).on('resize orientationchange', function () {
        // Check if we are now on desktop view (over 800px)
        if (window.matchMedia('(min-width: 801px)').matches) {
            
            // Get parent article container
            if (isUnderneath || isSideSmall || isSideMedium) {
                // Check if any tab has the active class directly
                const hasActiveTab = $tabs.hasClass('is-active');

                // If everything was left closed from mobile, simulate a click on the first tab link
                if (!hasActiveTab && $tabs.length) {
                    $tabs.first().find('.tab-title').trigger('click');
                }
            }
        }
    });

    // --- 3. Main Click Handler for Mobile Jumping & Toggling ---
    $('.tabs-grid .tab-title').on('click', function (e) {
        const isMobile = window.matchMedia('(max-width: 800px)').matches;
        
		// Run logic if:
        // 1. We are on mobile (<= 800px) OR
        // 2. We are on desktop (> 800px) AND it's NOT 'underneath' (i.e., side mode)
        if (isMobile || !isUnderneath || !isSideSmall || !isSideMedium) {
            const $clickedTitle = $(this);
            const $parentLi = $clickedTitle.closest('.tab'); 
            const hrefTarget = $clickedTitle.attr('href');
            const $targetContent = $(hrefTarget);

            // Accordion Toggle: If this parent tab container is already active, close it down
            if ($parentLi.hasClass('is-active')) {
                e.preventDefault();
                e.stopPropagation();

                // Remove the active status classes
                $parentLi.removeClass('is-active');
                $clickedTitle.attr('aria-selected', 'false');
                
                if ($targetContent.length) {
                    $targetContent.removeClass('is-active').attr('aria-hidden', 'true');
                }
                
                return; // Exit early completely
            }

            // --- Normal Open Scroll Logic ---
            const initialVisualOffset = $clickedTitle[0].getBoundingClientRect().top;

            requestAnimationFrame(function() {
                const newPagePosition = $clickedTitle.offset().top;
                window.scrollTo({
                    top: newPagePosition - initialVisualOffset,
                    behavior: 'auto' 
                });
            });
        }
    });
}
