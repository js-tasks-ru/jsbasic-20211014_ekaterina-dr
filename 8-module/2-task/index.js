import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filteredProducts = products;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: '',
    };

    this.render();
    this.renderProducts();
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
     <div class="products-grid__inner">
     </div>
    </div>`);
  }

  renderProducts() {
    let productInner = this.elem.querySelector('.products-grid__inner');
    productInner.innerHTML = '';
    this.filteredProducts.forEach((product) => {
      productInner.appendChild(new ProductCard(product).elem);
    })
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.filteredProducts = this.products.filter((product) => {
      return (this.filters.noNuts ? !product.nuts : true)
        && (this.filters.vegeterianOnly ? product.vegeterian : true)
        && (product.spiciness <= this.filters.maxSpiciness)
        && (this.filters.category ? product.category === this.filters.category : true);
    })

    this.renderProducts();
  }
}