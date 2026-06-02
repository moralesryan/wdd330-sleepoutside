import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", "#order-summary");
order.init();

document.querySelector("#zip").addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const checkoutStatus = myForm.checkValidity();
    if (checkoutStatus) {
        order.checkout();
    }
});