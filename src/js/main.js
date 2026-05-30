import { loadHeaderFooter } from "./utils.mjs";
import { superscript } from "./countingElementCart.mjs";
import { isFirstVisit } from "./utils.mjs";
async function init() {
  await loadHeaderFooter(); // wait until header/footer are fully loaded
  superscript(); // now cart exists → badge will show
}

// run init and then check first-visit after header is injected
init().then(() => {
  isFirstVisit();
});