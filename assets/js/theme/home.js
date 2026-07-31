/*
 Import all homepage specific js
 */
import PageManager from './page-manager';
import cardSwatches from './custom/card-swatches';
import cardWarranty from './custom/card-warranty';
import modalSubscribe from './custom/modal-subscribe';

export default class Home extends PageManager {
	
	dataProductCollection() {
	    const cards = document.querySelectorAll('.card, .listItem');
	    const dataIdArr= [];
	    cards.forEach(card => {
	        const id = card.dataset.test.replace('card-', '');
	        dataIdArr.push(Number(id));
	    });
	    return dataIdArr;
	}
	
	onReady() {
        cardSwatches(this.context.apiToken, this.dataProductCollection());
		cardWarranty();
        modalSubscribe();
    }
}
