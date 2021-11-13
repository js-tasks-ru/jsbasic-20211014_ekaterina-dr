import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;
    this.render();
    this.createCarouselInner();
    this.initCarousel();
  }

  render() {
    this.elem = createElement(`
    <div class="carousel">
     <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
     </div>
     <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
     </div>
   </div>`
    );
  };


  createCarouselInner() {
    let carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');


    this.slides.forEach(slide => {
      let carouselSlide = createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">\u20AC${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`
      );

      carouselSlide.querySelector('button').addEventListener('click', this.buttonClick);
      carouselInner.appendChild(carouselSlide);

    })
    this.elem.appendChild(carouselInner);
  }

  initCarousel() {

    let carusel = this.elem.querySelector('.carousel__inner');
    let elements = this.elem.querySelectorAll('.carousel__slide');
    let rightButton = this.elem.querySelector('.carousel__arrow_right');
    let leftButton = this.elem.querySelector('.carousel__arrow_left');

    let position = 0;
    let index = 1;

    rightButton.onclick = function () {

      position = -((document.querySelector('.carousel__slide').offsetWidth) * index);
      carusel.style.transform = `translateX(${position}px)`;
      index++;

      checkButton();
    };

    leftButton.onclick = function () {
      position += document.querySelector('.carousel__slide').offsetWidth;
      carusel.style.transform = `translateX(${position}px)`;
      index--;

      checkButton();
    };


    function checkButton() {
      rightButton.style.display = index === elements.length ? 'none' : '';
      leftButton.style.display = index === 1 ? 'none' : '';
    }

    checkButton();
  }

  buttonClick = (event) => {
    let slide = event.target.closest('.carousel__slide');
    let customEvent = new CustomEvent('product-add', {
      bubbles: true,
      detail: slide.dataset.id
    });

    this.elem.dispatchEvent(customEvent);
  }
}