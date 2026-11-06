/**
 * Custom global client js
*/
export default function () { 
	const brandsMenu = document.querySelector('.navPages-item-brands');
	if (!brandsMenu) return;
	const brandsLink = brandsMenu.querySelector('a.navPages-action');
	if (!brandsLink) return;
    brandsLink.addEventListener('click', function (event) {
        if (window.matchMedia('(min-width: 801px)').matches) {
            event.preventDefault();
            event.stopImmediatePropagation();
            window.location.assign('/brands/');
        }
    }, true);
}
