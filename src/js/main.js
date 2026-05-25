import { loadHeaderFooter } from "./utils.mjs";
import { superscript } from "./countingElementCart.mjs";

async function init() {
  await loadHeaderFooter(); // wait until header/footer are fully loaded
  superscript(); // now cart exists → badge will show
}

init();