import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get category from URL
const category = getParam("category");

// Create ProductData instance
const dataSource = new ProductData();

// Get product list container
const listElement = document.querySelector(".product-list");

// Create ProductList instance
const myList = new ProductList(
  category,
  dataSource,
  listElement
);

// Render products
myList.init();

// Update page title
const titleElement = document.querySelector(".title");

if (titleElement && category) {
  titleElement.textContent =
    `Top Products: ${category}`;
}