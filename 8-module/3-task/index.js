export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    let item = this.cartItems.find(item => item.product.id == product.id);
    if (item) {
      item.count++;
    } else {
      this.cartItems.push({ product, count: 1 });
    }
    this.onProductUpdate(this.cartItem);
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
    this.onProductUpdate(this.cartItem);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

