import { getLocalStorage, setLocalStorage } from "./utils.mjs";
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
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }
    addProductToCart() {
        let cartItems = getLocalStorage("so-cart");
        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }
        cartItems.push(this.product);
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
    console.log(product.Result);
    document.querySelector('h2').textContent = product.Result.Brand.Name;
    document.querySelector('h3').textContent = product.Result.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Result.Images.PrimaryLarge;
    productImage.alt = product.Result.NameWithoutBrand;

    document.getElementById('productPrice').textContent = `U$D ${product.Result.FinalPrice}`;
    document.getElementById('productColor').textContent = product.Result.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.Result.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}
