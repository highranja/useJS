"use strict";

const slideContainer = document.querySelector(".slide-container"),
	slideList = slideContainer.querySelector(".slide-list"),
	slide = slideList.querySelectorAll(".slide"),
	barBox = document.querySelector(".slide-bar"),
	prev = barBox.querySelector("#prev"),
	next = barBox.querySelector("#next"),
	bar = barBox.querySelector(".bar");

let move = 0,
	grabFrom = false,
	count = 0;

slideContainer.addEventListener("mousedown", (e) => {
	grabFrom = true;
	move += e.clientX;
});

slideContainer.addEventListener("mousemove", (e) => {
	if (grabFrom) {
		slideMove(e);
	}
});

slideContainer.addEventListener("mouseup", (e) => {
	grabFrom = false;
	move -= e.clientX;
	slideSetOnLine();
});

function slideMove(e) {
	const currentX = slideList.offsetLeft;
}

function slideSetOnLine() {
	console.log("놨다요놈");
	move = 0;
}

prev.addEventListener("click", () => {
	if (count < 1) return;
	count--;
	btnSlide();
});
next.addEventListener("click", () => {
	if (count > slide.length - 4) return;
	count++;
	console.log(count);
	btnSlide();
});

function btnSlide() {
	const slideWidth = slide[0].offsetWidth;
	const sliderWidth = slideList.offsetWidth;
	const currentSlideMove = count * slideWidth + 30 * count;

	slideList.style.left = `-${currentSlideMove}px`;
	barMoveOnSlide();
}

function barMoveOnSlide() {
	const maxNumber = slide.length - 3;
	const barPercent = (100 / maxNumber) * count;

	bar.style.width = `${barPercent}%`;
}
