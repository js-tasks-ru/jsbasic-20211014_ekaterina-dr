import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.createRibbonInner();
    this.addButtonsHandler();
    this.addRibbonListener();
    this.elem.querySelector('nav').addEventListener('click', this.categoryClick);

  }
  
  render() {
    this.elem = createElement(`
      <div class="ribbon">
      
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

      </div>`
    );
  }

  createRibbonInner() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.categories.forEach(category => {
      let ribbonCategory = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
      );

      ribbonInner.appendChild(ribbonCategory);

    });

  }

  addButtonsHandler() {
    let leftButton = this.elem.querySelector('.ribbon__arrow_left');
    let rightButton = this.elem.querySelector('.ribbon__arrow_right');

    leftButton.addEventListener('click', this.onLeftButtonClick);
    rightButton.addEventListener('click', this.onrightButtonClick);

  }

  onLeftButtonClick = () => {
    let ribbon = this.elem.querySelector('.ribbon__inner');
    ribbon.scrollBy(-350, 0);
  }
  onrightButtonClick = () => {
    let ribbon = this.elem.querySelector('.ribbon__inner');
    ribbon.scrollBy(350, 0);
  }


  onScrollHandlerLeft = (event) => {
    let ribbon = event.target;

    let scrollLeft = ribbon.scrollLeft;
    let leftButton = document.querySelector('.ribbon__arrow_left');

    if (scrollLeft === 0) {
      leftButton.classList.remove('ribbon__arrow_visible');
    } else {
      leftButton.classList.add('ribbon__arrow_visible');
    }
  }


  onScrollHandlerRight = (event) => {
    let ribbon = event.target;

    let scrollWidth = ribbon.scrollWidth;
    let scrollLeft = ribbon.scrollLeft;
    let clientWidth = ribbon.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    let rightButton = document.querySelector('.ribbon__arrow_right');

    if (scrollRight < 1) {
      rightButton.classList.remove('ribbon__arrow_visible');
    } else {
      rightButton.classList.add('ribbon__arrow_visible');
    }
  }

  addRibbonListener() {
    let ribbon = this.elem.querySelector('.ribbon__inner');
    ribbon.addEventListener('scroll', this.onScrollHandlerLeft);
    ribbon.addEventListener('scroll', this.onScrollHandlerRight);


  }


  categoryClick = (event) => {
    event.preventDefault();
    let category = event.target.closest('a');
    let activeCategory = this.elem.querySelector('.ribbon__item_active');
    if (category) {
      category.classList.add('ribbon__item_active');
    } else {
      category.classList.remove('ribbon__item_active');
    };

    if (activeCategory) {
      activeCategory.classList.remove('ribbon__item_active');
    };

    let customEvent = new CustomEvent('ribbon-select', {
      bubbles: true,
      detail: category.dataset.id

    });

    this.elem.dispatchEvent(customEvent);
  };
}


