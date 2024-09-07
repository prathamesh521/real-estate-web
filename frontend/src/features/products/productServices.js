import axios from "axios";

const API_URL = "/api/products/";
const API_URL_slug = "/api/products/slug/";


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


  return response.data;
};

const getProductBySlug = async (slug) => {
  const response = await axios.get(API_URL_slug + slug )
  console.log('getproduct by slug');

  if(response.data){
    console.log('product by slug:', response.data);
  }
  return response.data;
};

const getMyProducts = async () => {
  const response = await axios.get(API_URL + "myProducts", {
    withCredentials: true, // Automatically sends cookies (including JWT) with the request
  });

  return response.data;
};

const updateProduct = async (slug, productData) => {
  const response = await axios.put(API_URL + slug, productData, {
    withCredentials: true, // Automatically sends cookies (including JWT) with the request
  });

  return response.data;
};

const deleteProduct = async (slug) => {
  const response = await axios.delete(API_URL + slug, {
    withCredentials: true, // Automatically sends cookies (including JWT) with the request
  });

  return response.data;
};

const getCategories = async () => {
  const response = await axios.get("/api/categories");

  return response.data;
};


const productServices = {
  createProduct,
  getProducts,
  getProductBySlug,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getCategories,
};

export default productServices;
