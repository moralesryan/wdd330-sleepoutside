const baseURL = import.meta.env.VITE_SERVER_URL;

// console.log("BASE URL:", baseURL);

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() { }

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

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }

  getComments(productId) {
    const comments = JSON.parse(localStorage.getItem(`comments-${productId}`)) || [];
    return comments;
  }

  saveComment(productId, comment) {
    const comments = this.getComments(productId);
    comments.push(comment);
    localStorage.setItem(`comments-${productId}`, JSON.stringify(comments));
  }
}
