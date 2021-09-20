const images = document.querySelectorAll('.img500x500')
const carousel = document.querySelector('.img-carousel')
const rightArrow = document.querySelector('.arrow-right')
const leftArrow = document.querySelector('.arrow-left')
carousel.style.marginLeft = 0;
let margin = 0;

carousel.addEventListener('click', imgCarousel)

function imgCarousel(e) {
    if (e.target.classList.contains("arrowRight")) {
        if (!countMarginRight()) {
            margin -= 220;
            carousel.style.marginLeft = margin.toString() + 'px'
        }
    }
    if (e.target.classList.contains("arrowLeft")) {
        if (!countMarginLeft()) {
            margin += 220;
            carousel.style.marginLeft = margin.toString() + 'px'
        }
    }
}

function countMarginRight() {
    let minMargin = (3 - images.length) * 220;
    let minMarginStr = minMargin.toString() + 'px';
    console.log(carousel.style.marginLeft, 'carousel style');
    console.log(minMarginStr, 'minmarginstr');
    return carousel.style.marginLeft === minMarginStr;
}

function countMarginLeft() {
    let minMargin = '0px';
    console.log(carousel.style.marginLeft, 'carousel style');
    console.log(minMargin, 'minmargin');
    return carousel.style.marginLeft === minMargin;
}