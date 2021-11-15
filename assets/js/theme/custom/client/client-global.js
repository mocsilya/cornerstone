/**
 * Custom global client js
*/
export default function () { 
	$('.form-option-wrapper-250g .form-option').click(function() {
		$('.form-field-gift-message').removeClass('is-active');
		$('.form-field-gift-message .form-input').val('');
	});
	$('.form-option-wrapper-500g .form-option').click(function() {
		$('.form-field-gift-message').removeClass('is-active');
		$('.form-field-gift-message .form-input').val('');
	});
	$('.form-option-wrapper-1kg .form-option').click(function() {
		$('.form-field-gift-message').removeClass('is-active');
		$('.form-field-gift-message .form-input').val('');
	});
	$('.form-option-wrapper-3kg .form-option').click(function() {
		$('.form-field-gift-message').removeClass('is-active');
		$('.form-field-gift-message .form-input').val('');
	});
	$('.form-option-wrapper-filled-gift-cube-10cm .form-option').click(function() {
		$('.form-field-gift-message').addClass('is-active');
	});
	
}