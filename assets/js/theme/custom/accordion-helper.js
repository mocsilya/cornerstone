/**
 * expand/contract
*/
export default function () { 
	$('.accord .accord-heading').click(function() {
		$(this).parent().toggleClass('accord-active');
		$(this).next('.accord-body').slideToggle();
	});
}

