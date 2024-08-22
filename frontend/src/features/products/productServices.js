import axios from "axios";

const API_URL = "/api/products/";

// Create new product
const createProduct = async (productData) => {
  // Make sure axios sends cookies with the request
  const response = await axios.post(API_URL, productData, {
    withCredentials: true, // Send cookies (including the JWT token) with the request
  });

  return response.data;
};

// Get products
const getProducts = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true, // Automatically sends cookies (including JWT) with the request
  });

  console.log('response:', response);

  return response.data;
};



const productServices = {
  createProduct,
  getProducts
};

export default productServices;
