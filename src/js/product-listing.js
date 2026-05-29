import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get category or search query from URL
const category = getParam("category");
const searchQuery = getParam("search");

// Create ExternalServices instance
const dataSource = new ExternalServices();

// Get product list container
const listElement = document.querySelector(".product-list");

// Create ProductList instance — pass searchQuery as 4th argument
const myList = new ProductList(
  category,
  dataSource,
  listElement,
  searchQuery || ""
);

// Render products
myList.init();

// Update page title
const titleElement = document.querySelector(".title");

if (titleElement) {
  if (searchQuery) {
    titleElement.textContent = `Search Results for: "${searchQuery}"`;
  } else if (category) {
    titleElement.textContent = `Top Products: ${category}`;
  }
}
