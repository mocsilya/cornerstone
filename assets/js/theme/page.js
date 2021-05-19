/*
 Import all page specific js
 */
import PageManager from './page-manager';
import menuHelper from './custom/menu-helper';
import tabHash from './custom/tab-hash';

export default class Page extends PageManager {
	onReady() {
        menuHelper();
        tabHash();
    }
}
