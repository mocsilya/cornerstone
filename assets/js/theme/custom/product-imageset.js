/**
 * Product image set control for hiding and showing images based on options.
*/

import utils from '@bigcommerce/stencil-utils';

export default function () {	
    // 1. Get option configuration
    const $container = $('.product-options-container[data-imageset-option]');
    const targetOption = $container.data('imageset-option');

    if (!targetOption || !$('.productView-thumbnail[data-image-set]').length) {
        return;
    }

    const formOptions = document.querySelectorAll(
        `.productView-options .form-field-${targetOption} .form-select, .productView-options .form-field-${targetOption} .form-radio`
    );

    const timerDelay = 1000;
    let timerId = null;
    let mainImageObserver = null;

    // --- MASTER FUNCTION: Filters Slick/DOM and selects the first thumbnail ---
    const runImageSetUpdate = () => {
        // Disconnect observer right before performing click
        if (mainImageObserver) {
            mainImageObserver.disconnect();
            mainImageObserver = null;
        }

        let selectedElement = Array.from(formOptions).find(el => {
            return el.type === 'radio' ? el.checked : (el.selected || el.value);
        });

        if (!selectedElement) return;

        let imageSet;
        if (selectedElement.classList.contains('form-select')) {
            imageSet = selectedElement.options[selectedElement.selectedIndex].getAttribute('aria-label');
        } else {
            imageSet = selectedElement.getAttribute('aria-label');
        }

        const $slickGallery = $('.productView-thumbnails.slick-initialized');

        if ($slickGallery.length) {
            // Unfilter to reset state
            $slickGallery.slick('slickUnfilter');

            // Apply filter
            if (imageSet && imageSet !== 'None') {
                $slickGallery.slick('slickFilter', function() {
                    return $(this).find('[data-image-set="' + imageSet + '"]').length > 0 || 
                           $(this).attr('data-image-set') === imageSet;
                });
            }

            // Reset slider index to start
            $slickGallery.slick('slickGoTo', 0, true);

            // Small 20ms pause for Slick DOM layout calculation before click
            setTimeout(() => {
                const $firstThumb = $slickGallery.find('.slick-slide:not(.slick-cloned) [data-image-gallery-item]').first();

                if ($firstThumb.length) {
                    $('[data-image-gallery-item]').removeClass('is-active');
                    $firstThumb.addClass('is-active');
                    $firstThumb[0].click();
                }
            }, 0);

        } else {
            // Fallback for non-Slick DOM layout
            const imageList = document.querySelectorAll('.productView-thumbnail');
            let firstVisible = null;

            imageList.forEach((imageItem) => {
                const imageData = imageItem.getAttribute('data-image-set');
                if (imageSet === 'None' || imageData === imageSet) {
                    imageItem.style.display = 'flex';
                    if (!firstVisible) firstVisible = imageItem.querySelector('.productView-thumbnail-link') || imageItem;
                } else {
                    imageItem.style.display = 'none';
                }
            });

            if (firstVisible) {
                $('.productView-thumbnail-link, .productView-thumbnail').removeClass('is-active');
                $(firstVisible).addClass('is-active');
                firstVisible.click();
            }
        }
    };

    // --- HELPER: Starts watching main image for attribute rule swaps ---
    const watchMainImage = () => {
        const mainImgNode = document.querySelector('.productView-image img');

        if (!mainImgNode) return;

        if (mainImageObserver) {
            mainImageObserver.disconnect();
        }

        mainImageObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'src' || mutation.attributeName === 'srcset') {
                    const src = mainImgNode.getAttribute('src') || '';
					const srcSet = mainImgNode.getAttribute('srcset') || '';
                    const srcAttribute = src.includes('attribute_rule_images');
					const srcSetAttribute = srcSet.includes('attribute_rule_images');
					
					console.log("src: " + src);
					console.log("srcSet: " + srcSet);
					
                    if (srcAttribute || srcSetAttribute) {
                        runImageSetUpdate();   // Execute update
						clearTimeout(timerId); // Clear fallback
                    }
                }
            });
        });

        mainImageObserver.observe(mainImgNode, {
            attributes: true,
            attributeFilter: ['src', 'srcset']
        });
    };
	
    // 2. Attach change listeners to target option inputs using Stencil's remote hook
    window.stencilUtils.hooks.on('product-options-change-remote', (response, event) => {
        const changedElement = event ? event.target : null;

        // Check if the element that triggered the change belongs to our target option field
        const isTargetOption = changedElement && Array.from(formOptions).some(el => 
            el === changedElement || el.contains(changedElement)
        );

        // If it matches our option (or if the event target isn't explicitly readable), run it
        if (!changedElement || isTargetOption) {
            watchMainImage();
            runImageSetUpdate();
        }
    });

    /* old timeout system
    for (let i = 0; i < formOptions.length; i++) {
        formOptions[i].addEventListener("change", function() {
            clearTimeout(timerId);
			watchMainImage();
			timerId = setTimeout(() => {
				runImageSetUpdate();
            }, timerDelay);
        });
    }
	*/
}