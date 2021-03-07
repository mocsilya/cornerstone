/*
 Import all homepage specific js
 */
import PageManager from './page-manager';
import cardSwatches from './custom/card-swatches';
import modalSubscribe from './custom/modal-subscribe';

export default class Home extends PageManager {
	onReady() {
        cardSwatches();
        modalSubscribe();
    }
}
