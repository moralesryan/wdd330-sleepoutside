export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateOrderTotal();
    }

    calculateItemSubTotal() {
        this.list.forEach(item => {
            this.itemTotal += item.price
        });
        return this.itemTotal;
    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06);
        this.shipping = 10 + (2 * this.list.length);
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const subTotal = document.querySelector("#subtotal");
        const total = document.querySelector("#total");
        const shipping = document.querySelector("#shipping");

        tax.innerText = `$${this.tax.toFixed(2)}`;
        subTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        total.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
}