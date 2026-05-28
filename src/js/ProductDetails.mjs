import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { superscript } from "./countingElementCart.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    const addBtn = document.getElementById("addToCart");

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        this.handleAddToCart();
      });
    }
  }

  handleAddToCart() {
  this.addProductToCart();

  // Toast notification
  const toast = document.getElementById("toast");

  if (toast) {
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }

  // Cart animation
  const cartIcon = document.querySelector(".cart svg");

  if (cartIcon) {
    cart.classList.remove("cart-update");

    void cartIcon.offsetWidth;

    cartIcon.classList.add("cart-update");
  }
}

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart");

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    cartItems.push(this.product);

    setLocalStorage("so-cart", cartItems);

    superscript();

    // allow animation to be visible
    setTimeout(() => {
      window.location.href = "../cart/index.html";
    }, 2000);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

/* =========================
   TEMPLATE FUNCTION
========================= */
function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");

  if (productImage) {
    productImage.src =
      product.Images?.PrimaryLarge ||
      product.Images?.PrimaryMedium ||
      "";

    productImage.alt = product.NameWithoutBrand;

    productImage.onerror = () => {
      productImage.src = product.Images?.PrimarySmall || "";
    };
  }

  /* =========================
     FIXED 20% DISCOUNT LOGIC
  ========================= */

  const discountPercent = 20;

  const suggestedPrice =
    product.SuggestedRetailPrice ?? product.FinalPrice;

  const finalPrice = product.FinalPrice;

  const discountedPrice =
    suggestedPrice - (suggestedPrice * discountPercent) / 100;

  const discountAmount = suggestedPrice - discountedPrice;

  /* =========================
     PRICE DISPLAY
  ========================= */

  const priceEl = document.getElementById("productPrice");
  if (priceEl) {
    priceEl.textContent = `$${discountedPrice.toFixed(2)}`;
  }

  const originalEl = document.getElementById("productOriginalPrice");
  if (originalEl) {
    originalEl.textContent = `$${suggestedPrice.toFixed(2)}`;
  }

  const discountEl = document.getElementById("productDiscount");
  if (discountEl) {
    discountEl.textContent = `Save ${discountPercent}% ($${discountAmount.toFixed(2)})`;
  }

  const colorEl = document.getElementById("productColor");
  if (colorEl && product.Colors?.length) {
    colorEl.textContent = product.Colors[0].ColorName;
  }

  const descEl = document.getElementById("productDesc");
  if (descEl) {
    descEl.innerHTML = product.DescriptionHtmlSimple;
  }

  const addBtn = document.getElementById("addToCart");
  if (addBtn) {
    addBtn.dataset.id = product.Id;
  }
}