import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';
import clientGlobal from './custom/client/client-global';
import scrollDetect from './custom/scroll-detect';
import footerHelper from './custom/footer-helper';
import tabClick from './custom/tab-click';
import toggleClick from './custom/toggle-click';
import headerBar from './custom/header-bar';
import widgetHelper from './custom/widget-helper';
import sidebarHelper from './custom/sidebar-helper';
import scrollClick from './custom/scroll-click';
import boxSearch from './custom/box-search';
import accordionHelper from './custom/accordion-helper';
import scrollUrl from './custom/scroll-url';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        svgInjector();
		clientGlobal();
        scrollDetect();
		footerHelper();
		tabClick();
		toggleClick();
		headerBar();
		widgetHelper();
		sidebarHelper();
		scrollClick();
		boxSearch();
		accordionHelper();
		scrollUrl();
    }
}
