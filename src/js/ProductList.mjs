import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const image = product.Images?.PrimaryMedium || "";

  // ✅ calculate discount
  const hasDiscount =
    product.SuggestedRetailPrice &&
    product.FinalPrice < product.SuggestedRetailPrice;

  const discountAmount = hasDiscount
    ? (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)
    : null;

  return `
    <li class="product-card">

      <a href="../product_pages/index.html?product=${product.Id}">

        <img
          src="${image}"
          alt="Image of ${product.Name}"
        >

        <h2 class="card__brand">
          ${product.Brand.Name}
        </h2>

        <h3 class="card__name">
          ${product.Name}
        </h3>

        <p class="product-card__price">
          $${product.FinalPrice}
        </p>

        ${
          hasDiscount
            ? `<p class="discount-badge">
                Save $${discountAmount}
               </p>`
            : ""
        }

      </a>

    </li>
  `;
}


export default class ProductList {

  constructor(category, dataSource, listElement, searchQuery = "") {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchQuery = searchQuery;
    this.product = [];
  }

  async init() {

  if (this.searchQuery) {

    const allProducts = await this.dataSource.getAllProducts();

    this.products = this.filterProducts(
      allProducts,
      this.searchQuery
    );

  } else {

    this.products = await this.dataSource.getData(
      this.category
    );

  }

  this.renderList(this.products);

  // Sorting Event
  const sortElement = document.getElementById("sortProducts");

  if (sortElement) {

    sortElement.addEventListener("change", (e) => {

      this.sortProducts(e.target.value);

    });

  }

}

sortProducts(sortType) {

  let sortedProducts = [...this.products];

  switch (sortType) {

    case "name-asc":

      sortedProducts.sort((a, b) =>
        a.Name.localeCompare(b.Name)
      );

      break;

    case "name-desc":

      sortedProducts.sort((a, b) =>
        b.Name.localeCompare(a.Name)
      );

      break;

    case "price-asc":

      sortedProducts.sort(
        (a, b) => a.FinalPrice - b.FinalPrice
      );

      break;

    case "price-desc":

      sortedProducts.sort(
        (a, b) => b.FinalPrice - a.FinalPrice
      );

      break;

    default:

      sortedProducts = [...this.products];

  }

  this.renderList(sortedProducts);

}


  renderList(list) {
    this.listElement.innerHTML = "";
    if (!list || list.length === 0) {
      this.listElement.innerHTML = `<p class="no-products">No products found matching "${this.searchQuery || this.category}".</p>`;
      return;
    }

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}