import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductBySlug, updateProduct, reset } from "../features/products/productSlice";

const EditProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const { slug } = useParams();
  const dispatch = useDispatch();

  // Get the specific product state from the Redux store
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductBySlug(slug));

    // Reset the product state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch, slug]);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
      });
    }
  }, [product]);

  const onChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ slug, productData }));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
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
            <label htmlFor="description" className="form-label">
              Description
            </label>
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
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={productData.price}
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

export default EditProduct;
