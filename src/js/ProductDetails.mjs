import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import { superscript } from "./countingElementCart.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);

        // the product details are needed before rendering the HTML
        this.renderProductDetails();

        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        // added query selector for ".cart" for functionality when button is clicked item rotates back and forth to show something has been added to the cart
        document
            .getElementById("addToCart")
            .addEventListener("click", () => {
                this.addProductToCart();
                const cart = document.querySelector(".cart");
                cart.classList.add("cart-update");
            });
    }
    addProductToCart() {
        if (!this.product || !this.product.Id) {
            console.error("Product data is missing or incomplete:", this.product);
            return;
        }

        let cartItems = getLocalStorage("so-cart");

        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }

        cartItems.push(this.product);

        setLocalStorage("so-cart", cartItems);

        superscript();
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }

}
function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src =
        product.Images?.PrimaryLarge ||
        product.Images?.PrimaryMedium;

    productImage.alt = product.NameWithoutBrand;

    productImage.onerror = () => {
        productImage.src = product.Images?.PrimarySmall;
    };

    document.getElementById('productPrice').textContent = `U$D ${product.FinalPrice}`;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}
