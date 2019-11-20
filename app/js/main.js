(function () {


	onePageScroll(".main", {
		sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
		easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", 
		// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		animationTime: 1500,             // AnimationTime let you define how long each section takes to animate
		pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
		updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
		beforeMove: beforeMoveSlider(),  // This option accepts a callback function. The function will be called before the page moves.
		afterMove: afterMoveSlider(),   // This option accepts a callback function. The function will be called after the page moves.
		loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
		keyboard: true,                  // You can activate the keyboard controls
		responsiveFallback: false        // You can fallback to normal page scroll by defining the width of the browser in which
		// you want the responsive fallback to be triggered. For example, set this to 600 and whenever 
		// the browser's width is less than 600, the fallback will kick in.
	});

	document.querySelector(".main-aside__scrollbar").style.height = `25%`;
	document.querySelector(".header").style.animation = `graceIn 1s ease-in-out .5s forwards`;
	document.querySelectorAll(".main-item__bg")[0].style.animation = `gradientBgIn 1.5s ease-in-out forwards`;


	function beforeMoveSlider() {
		return (index) => {
			console.log(index);
			let scrollbarHeight = document.querySelector(".main-aside__scrollbar");
			let preventSlideIndex = parseInt(scrollbarHeight.style.height) / 100 * document.querySelectorAll(".main-item").length - 1;
			
			
			

			scrollbarHeight.style.height = `${index / document.querySelectorAll(".main-item").length * 100}%`;
			document.querySelectorAll(".main-item__bg")[preventSlideIndex].style.animation = `gradientBgOut 1s ease-in-out forwards`;
			document.querySelectorAll(".main-item")[preventSlideIndex].style.animation = `graceOut .5s ease-in-out forwards`;
			document.querySelectorAll(".main-nav__item")[preventSlideIndex].classList.toggle("active");

			
		}
	}
	function afterMoveSlider() {
		return (index) => {
			document.querySelectorAll(".main-item__bg")[index - 1].style.animation = `gradientBgIn 1s ease-in-out forwards`;
			document.querySelectorAll(".main-item")[index - 1].style.animation = `graceIn .5s ease-in-out forwards`;
			document.querySelectorAll(".main-nav__item")[index-1].classList.toggle("active");
		}
	}


})();