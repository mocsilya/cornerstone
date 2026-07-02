/**
 * Global Tab Click Router & Navigation Link Anchor Helper.
 * Location: assets/js/theme/custom/tab-click.js
*/

export default function initGlobalTabClickLinks() { 
    $(document).on('click', '.tab-click', function(e) {
        e.preventDefault();
        
        const clickHref = $(this).attr('href'); // e.g., '#tab-custom1' or '#tab-description'
        if (!clickHref) return;

        const targetEl = document.querySelector(clickHref);
        if (!targetEl) return;

        const $header = $('.header');
        
        // 1. STRICT STICKY HEADER HEIGHT CHECK
        // Only include the header height if the .header-fixed class is explicitly active
        let headerHeight = 0;
        if ($header.length && $header.hasClass('header-fixed')) {
            headerHeight = $header.outerHeight() || 0;
        }

        // 2. TABS BAR HEIGHT
        const $tabsBar = $('.tabs');
        const tabsHeight = $tabsBar.length ? $tabsBar.outerHeight() || 0 : 0;

        // COMBINED CLEARANCE = Sticky Header (if active) + Tab Bar Height
        const totalClearance = headerHeight + tabsHeight;

        // 3. DYNAMIC PRODUCT TABS TRIGGER
        if (clickHref.startsWith('#tab-custom')) {
            const $targetTabTitle = $(`.tab-title[href="${clickHref}"]`);
            
            if ($targetTabTitle.length) {
                $targetTabTitle.trigger('click');
            }
        } 
        // 4. STATIC CONTENT TABS TRIGGER
        else {
            $(clickHref).addClass('is-active').siblings().removeClass('is-active');
            
            $('.tab').each(function () {
                $(this).find('a[href="' + clickHref + '"]').parent().addClass('is-active').siblings().removeClass('is-active');
            });
        }

        // 5. GLOBAL SMOOTH SCROLL
        setTimeout(function() {
            const elementViewportTop = targetEl.getBoundingClientRect().top;
            const scrollDestination = window.scrollY + elementViewportTop - totalClearance;

            $('html, body').animate({
                scrollTop: scrollDestination
            }, 'slow');
        }, 200); 
    });
}
