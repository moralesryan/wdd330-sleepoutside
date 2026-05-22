import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { superscript } from "./superscript.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();
superscript();