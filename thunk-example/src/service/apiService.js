// apiService.js
const baseUrl = "https://fakestoreapi.com/";

export const fetchProductByID = async (id) => {
  try {
    const url = baseUrl + `products/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't find product.");
  }
};