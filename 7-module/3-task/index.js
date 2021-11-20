
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.elem.addEventListener('click', this.changeValue);

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
    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    let customEvent = new CustomEvent('slider-change', {
      bubbles: true,
      detail: this.value,
    });

    this.elem.dispatchEvent(customEvent);

  }

}





