"use strict";

const 
    slideContainer = document.querySelector(".slide-container"),
	slideList = slideContainer.querySelector(".slide-list"),
	slide = slideList.querySelectorAll(".slide"),
	barBox = document.querySelector(".slide-bar"),
	prev = barBox.querySelector("#prev"),
	next = barBox.querySelector("#next"),
	bar = barBox.querySelector(".bar");

let moveFrom = 0,    
	grabFrom = false,
    count = 0,
    currentX;

const maxNumber = slide.length - 4; 
const slideWidth = slide[0].offsetWidth; 

prev.addEventListener("click", () => {
	if (count < 1) return;
	count--;
	btnSlide();
});

next.addEventListener("click", () => {
	if (count > maxNumber) return;
	count++;	
	btnSlide();
});

slideContainer.addEventListener("mousedown", (e) => {
	grabFrom = true;
    moveFrom = e.clientX;       
});

slideContainer.addEventListener("mousemove", (e) => {
	if (grabFrom) {
		grabSlide(e);
	}
});

slideContainer.addEventListener("mouseup", (e) => {
	grabFrom = false;    
    moveFrom = 0;
});

function grabSlide(e) {
    const currentX = e.clientX;         
    let currentSlideX = slideList.offsetLeft - (moveFrom - currentX);

    if (currentSlideX > 0) {
        slideList.style.left = `${0}px`;
    } else if (currentSlideX < -3000) {
        slideList.style.left = `${-3010}px`;
    } else {
        slideList.style.left = `${currentSlideX}px`;
    }     

    let touchPercent = Math.floor(-currentSlideX *100 / 3010); // 마우스로 댕긴 만큼 바의 길이를 정한다
    count = Math.ceil( touchPercent * 7 / 100);
    bar.style.width = `${touchPercent}%`;    
}

function btnSlide() {	
	const currentSlideMove = count * slideWidth + 30 * count;    
    slideList.style.left = `-${currentSlideMove}px`;  

	barMoveOnSlide();
}

function barMoveOnSlide() {	
	const barPercent = (100 / (maxNumber + 1)) * count;    
	bar.style.width = `${barPercent}%`;
}

