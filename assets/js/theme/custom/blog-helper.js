/**
 * Removes duplicate tags on blog page.
*/
export default function () { 
	const seen = {};
	$('.navList-tag li').each(function() {
		let txt = $(this).text();
		if (seen[txt])
			$(this).remove();
		else
			seen[txt] = true;
	});
}
