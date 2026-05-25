import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { loadBreadcrumb } from "./Breadcrumb.mjs";

loadHeaderFooter();
loadBreadcrumb();

const category = getParam("category");

const dataSource = new ProductData();

const listElement = document.querySelector(".product-list");

const myList = new ProductList(
  category,
  dataSource,
  listElement
);

myList.init();

const titleElement = document.querySelector(".title");

if (titleElement && category) {
  titleElement.textContent =
    `Top Products: ${category}`;
}
