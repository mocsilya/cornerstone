/**
 * Track last page visited
*/
export default function () {
    const currentUrl = window.location.href;
    if (
        !currentUrl.includes('/login.php') && 
        !currentUrl.includes('/account.php') && 
        !currentUrl.includes('logout') &&
        !currentUrl.includes('/checkout') &&
        !currentUrl.includes('/cart.php')
    ) {
        try {
            const relativeUrl = window.location.pathname + window.location.search;
            sessionStorage.setItem('last_page', relativeUrl);
        } catch (e) {
            console.warn('Session storage unavailable.', e);
        }
    }
}