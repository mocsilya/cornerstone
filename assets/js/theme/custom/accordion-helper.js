/**
 * expand/contract
*/
export default function () { 
	$('.accord .accord-heading').click(function() {
		$(this).parent().toggleClass('accord-active');
		$(this).next('.accord-body').slideToggle();
	});
	
	$('.accord .accord-link .accord-icon').click(function() {
		$(this).parent().parent().toggleClass('accord-active');
		$(this).parent().next('.accord-body').slideToggle();
	});
}
