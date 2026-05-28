import { loadHeaderFooter } from "./utils.mjs";
import { superscript } from "./countingElementCart.mjs";
import { loadBreadcrumb } from "./Breadcrumb.mjs";

async function init() {
  await loadHeaderFooter();
  loadBreadcrumb();
  superscript();
}

init();
