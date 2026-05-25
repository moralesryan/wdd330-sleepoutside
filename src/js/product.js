import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { superscript } from "./countingElementCart.mjs";
import { loadBreadcrumb } from "./Breadcrumb.mjs";

loadHeaderFooter();
loadBreadcrumb();
superscript();

const productID = getParam('product');

const dataSource = new ProductData();

const product = new ProductDetails(productID, dataSource);

product.init();