import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { superscript } from "./countingElementCart.mjs";
import { loadBreadcrumb } from "./Breadcrumb.mjs";

loadHeaderFooter();
loadBreadcrumb();

const productID = getParam("product");

if (!productID) {
  console.error("❌ No product ID found in URL");

  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = `
      <p style="padding: 2rem; color: red;">
        Product ID is missing. Please return to product listing page.
      </p>
    `;
  }

  throw new Error("Missing product ID");
}

const dataSource = new ProductData();

const product = new ProductDetails(productID, dataSource);

(async function initPage() {
  try {
    await product.init();
    superscript();
  } catch (error) {
    console.error("❌ Failed to initialize product page:", error);

    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = `
        <p style="padding: 2rem; color: red;">
          Failed to load product. Please try again later.
        </p>
      `;
    }
  }
})();
