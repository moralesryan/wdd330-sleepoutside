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
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }
    addProductToCart() {
        let cartItems = getLocalStorage("so-cart");
        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }
        const existingItem = cartItems.find(item => item.Id === this.product.Id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.product.quantity = 1;
            cartItems.push(this.product);
        }
        setLocalStorage("so-cart", cartItems);
        superscript();
    }
    addToCart() {
        this.addProductToCart();
    }
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}
function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;
    const productImage = document.getElementById('productImage');
    const small = product.Images?.PrimarySmall || "";
    const medium = product.Images?.PrimaryMedium || "";
    const large = product.Images?.PrimaryLarge || "";
    productImage.src = large || medium;
    productImage.srcset = `${medium} 800w, ${large} 1200w`;
    productImage.sizes = "(max-width: 720px) 800px, 1200px";
    productImage.alt = product.NameWithoutBrand;
    productImage.onerror = () => {
        productImage.src = small;
    };
    document.getElementById('productPrice').textContent = `U$D ${product.FinalPrice}`;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
}