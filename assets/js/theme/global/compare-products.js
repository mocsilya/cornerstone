import { showAlertModal } from './modal';

function decrementCounter(counter, item) {
    const index = counter.indexOf(item);

    if (index > -1) {
        counter.splice(index, 1);
    }
}

function incrementCounter(counter, item) {
    counter.push(item);
}

function updateCounterNav(counter, $link, urls) {
    if (counter.length !== 0) {
        if (!$link.is('visible')) {
            $link.addClass('show');
        }
        $link.attr('href', `${urls.compare}/${counter.join('/')}`);
        $link.find('span.countPill').html(counter.length);
    } else {
        $link.removeClass('show');
    }
}

export default function ({ noCompareMessage, urls }) {
    let compareCounter = [];

    const $compareLink = $('a[data-compare-nav]');

    $('body').on('compareReset', () => {
        const $checked = $('body').find('input[name="products\[\]"]:checked');

        compareCounter = $checked.length ? $checked.map((index, element) => element.value).get() : [];
        updateCounterNav(compareCounter, $compareLink, urls);
    });

    $('body').triggerHandler('compareReset');

    $('body').on('click', '[data-compare-id]', event => {
		const button = event.currentTarget;
        const product = event.currentTarget.value;
        const $clickedCompareLink = $('a[data-compare-nav]');
		
        if (event.currentTarget.checked) {
            incrementCounter(compareCounter, product);
			button.parentNode.parentNode.parentNode.classList.add('clicked');
        } else {
            decrementCounter(compareCounter, product);
			button.parentNode.parentNode.parentNode.classList.remove('clicked');
        }

        updateCounterNav(compareCounter, $clickedCompareLink, urls);
    });

    $('body').on('click', 'a[data-compare-nav]', () => {
        const $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');

        if ($clickedCheckedInput.length <= 1) {
            showAlertModal(noCompareMessage);
            return false;
        }
    });
}
