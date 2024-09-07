import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { createProduct, getCategories } from "../features/products/productSlice";

const UserDashboard = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [], // Store actual file objects here
  });

  const [categories, setCategories] = useState([]); // State to hold categories
  const [imagePreviews, setImagePreviews] = useState([]); // State to hold image previews

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action to fetch categories
    dispatch(getCategories()).then((response) => {
      setCategories(response.payload);
    });
  }, [dispatch]);

  // Handle text input changes
  const onChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle image file changes and generate previews
  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({
      ...productData,
      images: files, // Store the actual file objects
    });

    // Generate image previews
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);

    // Append each image file to FormData
    productData.images.forEach((image) => {
      formData.append("images", image);
    });

    // Dispatch the createProduct action
    dispatch(createProduct(formData));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div>User Dashboard</div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={productData.name}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={productData.description}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={productData.price}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={productData.category}
              onChange={onChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="images" className="form-label">Images</label>
            <input
              type="file"
              className="form-control"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={onImageChange}
            />
            <div className="image-preview">
              {imagePreviews.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Preview"
                  style={{ maxWidth: "100px", margin: "10px" }}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UserDashboard;
