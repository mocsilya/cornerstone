/**
 * Cutstom Widget Scripts
*/
import 'slick-carousel';

export default function () {
	$('.custom-widget-carousel-yes').each(function() {
		$(this).find('.custom-widget-list').slick({
			slidesToShow: 2,
	        slidesToScroll: 2,
	        infinite: true,
			autoplay: true,
			autoplaySpeed: 6000,
	        dots: false,
			arrows: true,
			mobileFirst: true,
			swipe: true,
	        responsive: [
				{
					breakpoint: 1261,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6
					}
				},
				{
					breakpoint: 801,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				},
				{
					breakpoint: 551,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}
			]
		});	
	});
	
	document.querySelectorAll(".custom-widget-youtube").forEach(function(element) {
		element.querySelector(".custom-widget-play").addEventListener("click", (event) => {
			// disable video links (provided for non-JS visitors)
			event.preventDefault();
			loadVideo(element);
		});
	});
	
	const loadVideo = function(element) {
		const iframe = document.createElement("iframe");
		iframe.setAttribute("src", "https://www.youtube.com/embed/" + element.getAttribute("data-id") + "?autoplay=1");
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "1");
		iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
		element.insertBefore(iframe, element.querySelector(".custom-widget-play"));
	};
}

