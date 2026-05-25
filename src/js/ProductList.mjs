import { renderListWithTemplate } from "./utils.mjs";
function productCardTemplate(product) {
  const small = product.Images?.PrimarySmall || "";
  const medium = product.Images?.PrimaryMedium || "";
  const large = product.Images?.PrimaryLarge || "";
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img
          src="${medium}"
          srcset="${small} 400w, ${medium} 800w, ${large} 1200w"
          sizes="(max-width: 480px) 400px, (max-width: 1024px) 800px, 1200px"
          alt="Image of ${product.Name}"
        >
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
};