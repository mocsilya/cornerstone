/*
 Import all homepage specific js
 */
import PageManager from './page-manager';
import cardSwatches from './custom/card-swatches';
import cardWarranty from './custom/card-warranty';
import cardCarousel from './custom/card-carousel';
import modalSubscribe from './custom/modal-subscribe';

export default class Home extends PageManager {
	onReady() {
        cardSwatches();
		cardWarranty();
		cardCarousel();
        modalSubscribe();
    }
}
