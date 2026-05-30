import ProductData from "./ProductData.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { loadBreadcrumb } from "./Breadcrumb.mjs";

// Load header, footer and breadcrumb
loadHeaderFooter();
loadBreadcrumb();

// Get category or search query from URL
const category = getParam("category");
const searchQuery = getParam("search");

// Choose data source: prefer ExternalServices if available, otherwise fallback to ProductData
const dataSource = typeof ExternalServices !== "undefined" ? new ExternalServices() : new ProductData();

// Get product list container
const listElement = document.querySelector(".product-list");

// Create ProductList instance — pass searchQuery as 4th argument
const myList = new ProductList(
  category,
  dataSource,
  listElement,
  searchQuery || ""
);

// Render/init products
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