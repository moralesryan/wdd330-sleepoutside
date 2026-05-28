import { loadHeaderFooter } from "./utils.mjs";
import { superscript } from "./countingElementCart.mjs";
import Alert from "./Alert.js";

async function init() {
  await loadHeaderFooter(); // wait until header/footer are fully loaded
  superscript(); // now cart exists → badge will show
}

const alert = new Alert();

alert.renderAlerts();

init();