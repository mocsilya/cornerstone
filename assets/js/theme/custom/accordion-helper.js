/**
 * expand/contract
*/
export default function () { 
	$('.accordion .accordion-heading').click(function() {
		$(this).parent().toggleClass('accordion-active');
		$(this).next('.accordion-body').slideToggle();
	});
}

