"use strict";

const slideContainer = document.querySelector(".slide-container"),
	slideList = slideContainer.querySelector(".slide-list"),
	slide = slideList.querySelectorAll(".slide");

let move = 0;

slideContainer.addEventListener("mousedown", (e) => {
	console.log(e.clientX);
	move += e.clientX;
});

slideContainer.addEventListener("mouseup", (e) => {
	console.log(e.clientX);
	move -= e.clientX;
	slideMove();
});

function slideMove() {
    const prevSlideMove = slideList.offsetLeft;
    const slideListWidth = slideList.offsetWidth;
    const viewWidth = document.body.offsetWidth;
    const maxWidth = slideListWidth - viewWidth;
    let slideMoveTo = prevSlideMove - move;

    console.log(prevSlideMove ,slideListWidth,viewWidth,maxWidth,slideMoveTo, move )
    if (prevSlideMove > -maxWidth) {
        slideList.style.left = `${slideMoveTo}px`;
    } else {
        slideList.style.left = `${-maxWidth}px`;
    }

	

	move = 0;
};

