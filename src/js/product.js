import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { superscript } from "./countingElementCart.mjs";

loadHeaderFooter();
superscript();

// Get product ID from URL
const productID = getParam('product');

// Create data source
const dataSource = new ProductData();

// Create product details instance
const product = new ProductDetails(productID, dataSource);

// Initialize product details page
product.init();