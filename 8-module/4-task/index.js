import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let item = this.cartItems.find(item => item.product.id == product.id);
    if (item) {
      item.count++;
    } else {
      this.cartItems.push({ product, count: 1 });
    }
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    let item = this.cartItems.find(item => item.product.id == productId);

    if (item) {
      item.count += amount;

      if (item.count == 0) {
        let index = this.cartItems.findIndex(item => item.product.id == productId);
        this.cartItems.splice(index, 1);
      }
    }
    this.onProductUpdate(item);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice += item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    let modalInner = createElement(`<div></div>`);

    this.cartItems.forEach((item) => {
      let product = this.renderProduct(item.product, item.count);
      modalInner.appendChild(product);
    });

    let form = this.renderOrderForm();
    modalInner.appendChild(form);
    this.modal.setBody(modalInner);

    modalInner.querySelectorAll('.cart-product').forEach((productElem) => {
      let productId = productElem.dataset.productId;
      let buttonMinus = productElem.querySelector('.cart-counter__button_minus');
      let buttonPlus = productElem.querySelector('.cart-counter__button_plus');

      buttonMinus.addEventListener('click', () => this.updateProductCount(productId, -1));
      buttonPlus.addEventListener('click', () => this.updateProductCount(productId, 1));
    })

    form.addEventListener('submit', this.onSubmit);
    this.modal.open();
  }

  onProductUpdate(cartItem) {

    if (document.body.classList.value.includes('is-modal-open')) {
      let modalBody = document.querySelector('.modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;

      let totalPrice = this.getTotalPrice();
      infoPrice.innerHTML = `€${totalPrice.toFixed(2)}`;

      if (this.cartItems.length === 0) {
        this.modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit = async (event) => {
    event.preventDefault();
    let forms = document.forms;
    let form = forms[0];

    let buttonSubmit = form.querySelector('button[type="submit"]');
    buttonSubmit.classList.add('is-loading');

    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    });

    if (response.json()) {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      let newBody = createElement(
        `<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`
);
      this.modal.setBody(newBody);
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

