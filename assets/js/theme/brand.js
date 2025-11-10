import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from './common/utils/translations-utils';
import cardSwatches from './custom/card-swatches';
import cardWarranty from './custom/card-warranty';
import cardCarousel from './custom/card-carousel';
import menuHelper from './custom/menu-helper';
import cardData from './custom/card-data';

export default class Brand extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }
	
	dataProductCollection() {
	    const cards = document.querySelectorAll('.product .card, .product .listItem');
	    const dataIdArr= [];
	    cards.forEach(card => {
	        const id = card.dataset.test.replace('card-', '');
	        dataIdArr.push(Number(id));
	    });
	    return dataIdArr;
	}

    onReady() {
        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }
		
        cardSwatches();
        cardWarranty();
		cardCarousel();
		menuHelper();
		const dataOnReady = this.context.cardVariantData;
		if (dataOnReady) {
			cardData(this.context.apiToken, this.dataProductCollection());
		}
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.brandProductsPerPage;
        const requestOptions = {
            template: {
                productListing: 'brand/product-listing',
                sidebar: 'brand/sidebar',
            },
            config: {
                shop_by_brand: true,
                brand: {
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            showMore: 'brand/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);
			
			const dataFacetedSearch = this.context.cardVariantData;
			if (dataFacetedSearch) {
				cardData(this.context.apiToken, this.dataProductCollection());
			}
			
            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }
}
