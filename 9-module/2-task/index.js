import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';
import ProductGrid from '../../8-module/2-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
  }

  async render() {
    document.querySelector('[data-carousel-holder]').appendChild(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').appendChild(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').appendChild(this.stepSlider.elem);

    let cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').appendChild(cartIcon.elem);

    this.cart = new Cart(cartIcon);

    let response = await fetch('products.json');
    let result = await response.json();
    this.products = result;

    if (result) {
      this.productGrid = new ProductGrid(result);
      document.querySelector('[data-products-grid-holder]').appendChild(this.productGrid.elem);


      this.productGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: 3,
        category: this.ribbonMenu.value
      });
    }

    document.body.addEventListener('product-add', (event) => {
      let item = this.products.find(item => item.id === event.detail);
      this.cart.addProduct(item);
    });

    document.body.addEventListener('slider-change', (event) => {
      this.productGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    })

    document.body.addEventListener('ribbon-select', (event) => {
      this.productGrid.updateFilter({
        category: event.detail,
      });

    })

    let nutsCheckbox = document.querySelector('#nuts-checkbox');
    nutsCheckbox.addEventListener('change', () => {
      this.productGrid.updateFilter({
        noNuts: nutsCheckbox.checked,
      });
    });

    let vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', () => {
      this.productGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked,
      });
    });

  }
}
