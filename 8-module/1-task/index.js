import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, { once: true });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition = () => {
    let cart = this.elem;

    if (cart && cart.offsetWidth && cart.offsetHeight && document.documentElement.clientWidth > 767) {
      let topCoords = cart.getBoundingClientRect().top;
      let windowY = window.pageYOffset;

      if (topCoords <= 0) {
        let leftIndent = Math.min(
          document.querySelector('.container').getBoundingClientRect().right + 20,
          document.documentElement.clientWidth - this.elem.offsetWidth - 10
        ) + 'px';

        cart.style.position = 'fixed';
        cart.style.top = '50px';
        cart.style.left = leftIndent;
        cart.style.right = '10px';
        cart.style.zIndex = 1000;

      };

      if (windowY == 0) {
        cart.style.position = '';
        cart.style.top = '';
        cart.style.left = '';
        cart.style.right = '';
        cart.style.zIndex = '';

      };

    }
  }


}
