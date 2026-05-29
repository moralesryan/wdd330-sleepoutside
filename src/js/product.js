import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { superscript } from "./countingElementCart.mjs";

// Load shared UI first
loadHeaderFooter();

// Get product ID safely
const productID = getParam("product");

// Guard clause (VERY IMPORTANT)
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

// Create data source
const dataSource = new ExternalServices();

// Create product instance
const product = new ProductDetails(productID, dataSource);

// Safe initialization
(async function initPage() {
  try {
    await product.init();

    // Run cart badge AFTER page is ready
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