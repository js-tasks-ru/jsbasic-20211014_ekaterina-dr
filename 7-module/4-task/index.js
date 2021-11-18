export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.elem.addEventListener('click', this.changeValue);
    this.elem.querySelector('.slider__thumb').addEventListener('pointerdown', this.moveThumb);

  }
  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = `
   <div class="slider__thumb">
     <span class="slider__value"></span>
   </div>

   <div class="slider__progress" style="width: 0%;"></div>
   <div class="slider__steps">
   </div>`

    let spans = '';
    for (let i = 0; i < this.steps; i++) {
      if (i === 0) {
        spans += '<span class="slider__step-active"></span>';
      } else {
        spans += '<span></span>';
      };
    };
    this.elem.querySelector('.slider__steps').innerHTML = spans;

  }

  changeValue = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    this.value = value;
    let valuePercents = value / segments * 100;

    this.elem.querySelector('.slider__value').innerHTML = value;
    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    let customEvent = new CustomEvent('slider-change', {
      bubbles: true,
      detail: this.value,
    });

    this.elem.dispatchEvent(customEvent);

  }

  moveThumb = (event) => {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');
    let sliderValue = this.elem.querySelector('.slider__value')
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    thumb.style.position = 'absolute';
    thumb.style.zIndex = 1000;


    let move = (event) => {
      event.preventDefault();
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let valuePercents = leftRelative * 100;
      
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      this.value = value;
      sliderValue.innerHTML = value;
    }

    move(event);

    document.addEventListener('pointermove', move);

    document.onpointerup = () => {
      document.removeEventListener('pointermove', move);
      document.onpointerup = null;
      document.querySelector('.slider').classList.remove('slider_dragging');

      let customEvent = new CustomEvent('slider-change', {
        bubbles: true,
        detail: this.value,
      });

      this.elem.dispatchEvent(customEvent);
    };

    thumb.ondragstart = () => false;

  };

}