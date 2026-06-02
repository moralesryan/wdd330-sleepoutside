import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

  const image =
    product.Images?.PrimaryMedium || "";

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

      </a>
            <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
    </li>
  `;
}

export default class ProductList {

  constructor(category, dataSource, listElement, searchQuery = "") {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchQuery = searchQuery;
  }

  async init() {
    let list = [];
    if (this.searchQuery) {
      const allProducts = await this.dataSource.getAllProducts();
      list = this.filterProducts(allProducts, this.searchQuery);
    } else {
      list = await this.dataSource.getData(this.category);
    }

    this.renderList(list);
  }

  filterProducts(list, query) {
    const q = query.toLowerCase().trim();
    return list.filter(product => {
      return (
        product.Name?.toLowerCase().includes(q) ||
        product.Brand?.Name?.toLowerCase().includes(q) ||
        product.DescriptionHtmlSimple?.toLowerCase().includes(q) ||
        product.Category?.toLowerCase().includes(q)
      );
    });
  }

  renderList(list) {
    this.listElement.innerHTML = "";
    if (!list || list.length === 0) {
      this.listElement.innerHTML = `<p class="no-products">No products found matching "${this.searchQuery || this.category}".</p>`;
      return;

      this.listElement.querySelectorAll(".quick-view-btn").forEach(button => {
        button.addEventListener("click", (e) => {
          const productId = e.target.dataset.id;
          const product = list.find(p => p.Id === productId);
          this.openModal(product);
        });
      });
    }

    openModal(product) {
      document.getElementById("modal-img").src = product.Images?.PrimaryMedium || "";
      document.getElementById("modal-brand").textContent = product.Brand?.Name || "";
      document.getElementById("modal-name").textContent = product.Name || "";
      document.getElementById("modal-price").textContent = `$${product.FinalPrice || ""}`;
      document.getElementById("quick-view-modal").classList.remove("hidden");

      document.getElementById("modal-close").addEventListener("click", () => {
        document.getElementById("quick-view-modal").classList.add("hidden");
      });
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