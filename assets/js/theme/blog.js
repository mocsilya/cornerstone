/*
 Import all blog specific js
 */
import PageManager from './page-manager';
import menuHelper from './custom/menu-helper';
import blogHelper from './custom/blog-helper';

export default class Blog extends PageManager {
	onReady() {
        menuHelper();
		blogHelper();
    }
}
