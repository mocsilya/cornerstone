/**
 * Removes duplicate tags on blog page and performs search.
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
	
	const blogForm = $(".form-blog");
	const blogInput = $(".form-blog-search");
	blogForm.on("submit", function(e){
		e.preventDefault();
	    window.location = "/search.php?section=content&search_query=" + blogInput.val();
	});
}
