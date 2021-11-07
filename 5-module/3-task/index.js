function initCarousel() {
let offsetWidth = document.querySelector('.carousel__slide').offsetWidth;
let carusel = document.querySelector('.carousel__inner');
let elements = document.querySelectorAll('.carousel__slide');
let rightButton =document.querySelector('.carousel__arrow_right');
let leftButton =document.querySelector('.carousel__arrow_left');

let position = 0;
let index = 1;

rightButton.onclick = function() {
  position = -(offsetWidth * index);
  carusel.style.transform = `translateX(${position}px)`;
  index++;
  checkButton();
   };

  leftButton.onclick = function() {
  position += offsetWidth;
  carusel.style.transform = `translateX(${position}px)`;
  index--;
  
  checkButton();
 };


 function checkButton() {
  rightButton.style.display = index === elements.length ? 'none' : '';
  leftButton.style.display = index === 1 ? 'none' : '';
 }
 
 checkButton();
};