import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import { loadBreadcrumb } from "./Breadcrumb.mjs";

loadBreadcrumb();

const category = getParam("category") || "tents";
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

productList.init();
