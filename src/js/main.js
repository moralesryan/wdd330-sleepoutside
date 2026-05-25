import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { superscript } from "./countingElementCart.mjs";
import { loadBreadcrumb } from "./Breadcrumb.mjs";

loadHeaderFooter();
loadBreadcrumb();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();


superscript();
