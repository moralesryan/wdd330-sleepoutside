const baseURL = import.meta.env.VITE_SERVER_URL;

console.log("BASE URL:", baseURL);

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${category}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  async getAllProducts() {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    const allProductsPromises = categories.map(category => this.getData(category));
    const allProductsArrays = await Promise.all(allProductsPromises);
    return allProductsArrays.flat();
  }

  async findProductById(id) {
    const response = await fetch(
      `${baseURL}product/${id}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }
}