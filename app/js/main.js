(function () {


	onePageScroll(".main", {
		sectionContainer: "section",
		easing: "ease",
		animationTime: 1500,
		pagination: true,
		updateURL: false,
		beforeMove: beforeMoveSlider(),
		afterMove: afterMoveSlider(),
		loop: false,
		keyboard: true,
		responsiveFallback: false

	});

	var wow = new WOW(
		{
			boxClass: 'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0,          // distance to the element when triggering the animation (default is 0)
			mobile: true,       // trigger animations on mobile devices (default is true)
			live: true,       // act on asynchronously loaded content (default is true)
			callback: function (box) {
				// the callback is fired every time an animation is started
				// the argument that is passed in is the DOM node being animated
			},
			scrollContainer: null,    // optional scroll container selector, otherwise use window,
			resetAnimation: true,     // reset animation on end (default is true)
		}
	);
	wow.init();

	let navItems = document.querySelectorAll(".main-nav__item");
	let animProperties = {
		fadeInLeft: "fadeOutLeft",
		fadeOutLeft: "fadeInLeft",
		fadeInRight: "fadeOutRight",
		fadeOutRight: "fadeInRight",
		fadeIn: "fadeOut",
		fadeOut: "fadeIn",

	}

	document.querySelector(".main-aside__scrollbar").style.height = `20%`;
	document.querySelectorAll(".main-item")[0].style.animation = `graceIn 1s ease-in-out .5s forwards`;
	document.querySelectorAll(".main-item__bg")[0].style.animation = `gradientBgIn 1.5s ease-in-out forwards`;

	listenerInit();


	function listenerInit() {
		for (let i = 0; i < navItems.length; i++) {
			navItems[i].addEventListener("click", scrollTo);
		}
	}

	function beforeMoveSlider() {
		return (index) => {

			let scrollbarHeight = document.querySelector(".main-aside__scrollbar");
			let preventSlideIndex = parseInt(scrollbarHeight.style.height) / 100 * document.querySelectorAll(".main-item").length - 1;

			scrollbarHeight.style.height = `${index / document.querySelectorAll(".main-item").length * 100}%`;
			document.querySelectorAll(".main-item__bg")[preventSlideIndex].style.animation = `gradientBgOut 1s ease-in-out forwards`;
			document.querySelectorAll(".main-item")[preventSlideIndex].style.animation = `graceOut .5s ease-in-out forwards`;
			document.querySelectorAll(".main-nav__item")[preventSlideIndex].classList.toggle("active");
//////////////////////////////////////teeeest
			let contentOut = document.querySelectorAll(".wow");
			for (let i = 0; i < contentOut.length; i++) {
				console.log(contentOut[i].classList[2]);
				let animElement = contentOut[i].classList[2];

				if (document.querySelectorAll(".main-item")[index - 1].classList[1] === contentOut[i].classList[0].replace(/_.*/, '')) {
					contentOut[i].classList.remove(animElement);
					contentOut[i].classList.add(animProperties[animElement]);
					contentOut[i].style.animation = `${animProperties[animElement]} ${0.1}s forwards`;

				} else {

					contentOut[i].classList.remove(animElement);
					contentOut[i].classList.add(animProperties[animElement]);
					contentOut[i].style.animation = `${animProperties[animElement]} 1s forwards`;
					//${contentOut[i].getAttribute("data-wow-duration")}
				}
			}

		}
	}

	function afterMoveSlider() {
		return (index) => {
			document.querySelectorAll(".main-item__bg")[index - 1].style.animation = `gradientBgIn 1s ease-in-out forwards`;
			document.querySelectorAll(".main-item")[index - 1].style.animation = `graceIn .5s ease-in-out forwards`;
			document.querySelectorAll(".main-nav__item")[index - 1].classList.toggle("active");

			let contentOut = document.querySelectorAll(".wow");
			for (let i = 0; i < contentOut.length; i++) {
				let animElement = contentOut[i].classList[2];
				//if (document.querySelectorAll(".main-item")[index - 1].classList[1] === contentOut[i].classList[0].replace(/_.*/, '')) {}


				contentOut[i].classList.remove(animElement);
				contentOut[i].classList.add(animProperties[animElement]);
				contentOut[i].style.visibility = `visible`;
				// console.log(contentOut[i].getAttribute("data-wow-duration"));
				contentOut[i].style.animation = `${animProperties[animElement]} ${contentOut[i].getAttribute("data-wow-duration")} forwards`;
				
			}
		}
	}

	function scrollTo() {

		let index = Array.from(this.parentNode.children).indexOf(this);
		moveTo("main", index + 1);
	}

})();