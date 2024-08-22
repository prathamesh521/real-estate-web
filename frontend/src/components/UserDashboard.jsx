import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Navbar from "./Navbar";
import { createProduct } from "../features/products/productSlice";

const UserDashboard = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });

const dispatch = useDispatch();

  const onChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Dispatch action to create new product
    dispatch(createProduct(productData));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div>UserDashboard</div>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label for="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserDashboard;
