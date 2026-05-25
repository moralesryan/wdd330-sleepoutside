import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { superscript } from './countingElementCart.mjs';

loadHeaderFooter();

const category = getParam('category');

document.querySelector('#product-listing-title').textContent = `Top Products: ${category}`;

const dataSource = new ProductData(category);
const listElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, listElement);

productList.init();

superscript();
