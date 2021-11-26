/**
 * Custom global client js
*/
export default function () { 
	$('.form-field-select-format .form-option').click(function() {		
		if ($(this).hasClass("form-option-small-gift-jar")) {
			$('.form-field-gift-message').addClass('is-active');
			$('.form-field-select-label-gift-jars-only').addClass('is-active');
		} else if ($(this).hasClass("form-option-large-gift-jar")) {
			$('.form-field-gift-message').addClass('is-active');
			$('.form-field-select-label-gift-jars-only').addClass('is-active');
		} else {
			$('.form-field-gift-message').removeClass('is-active');
			$('.form-field-gift-message .form-input').val('');
			$('.form-field-select-label-gift-jars-only').removeClass('is-active');
			$('.form-field-select-label-gift-jars-only .form-select').prop('selectedIndex',0);
		}
	});
	// Elfsight
	$('#eapps-instagram-feed-1 a:last-child').attr('style','display: none !important');
}