/*
 Import all homepage specific js
 */
import PageManager from './page-manager';
import menuHelper from './custom/menu-helper';

export default class Page extends PageManager {
	onReady() {
        menuHelper();
    }
}
