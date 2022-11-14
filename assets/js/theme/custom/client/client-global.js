/**
 * Custom global client js
*/
export default function () { 
	
	$('.form-field-label-wording .form-label-none').hide();
	$('.form-field-label-wording .form-radio-none').hide();
	
	$('.form-field-select-format .form-option').click(function() {		
		if ($(this).hasClass('form-option-small-gift-jar') || $(this).hasClass('form-option-large-gift-jar')) {
			$('.form-field-label-wording').addClass('is-active');
			$('.form-field-select-label-gift-jars-only').addClass('is-active');
			if ($('.form-field-label-wording .form-radio-none').is(':checked')) {
				$('.form-field-label-wording .form-radio-none').prop('checked', false);
				$('.form-radio-use-default-text').prop('checked', true);
			}
		} else {
			$('.form-field-label-wording').removeClass('is-active');
			$('.form-radio-type-my-own-text').prop('checked', false);
			$('.form-radio-use-default-text').prop('checked', false);
			$('.form-field-label-wording .form-radio-none').prop('checked', true);
			$('.form-field-custom-text').removeClass('is-active');
			$('.form-field-custom-text .form-input').val('');
			$('.form-field-select-label-gift-jars-only').removeClass('is-active');
			$('.form-field-select-label-gift-jars-only .form-select').prop('selectedIndex',0);
		}
	});
	
	$('.form-field-label-wording .form-radio').click(function() {		
		if ($(this).hasClass("form-radio-type-my-own-text")) {
			$('.form-field-custom-text').addClass('is-active');
		} else {
			$('.form-field-custom-text').removeClass('is-active');
			$('.form-field-custom-text .form-input').val('');
		}
	});
	
	// Elfsight
	$('#eapps-instagram-feed-1 a:last-child').attr('style','display: none !important');
}