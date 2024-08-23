import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductBySlug, reset } from "../features/products/productSlice";
import Navbar from "./Navbar";

const DetailPage = () => {
  const { slug } = useParams();
  console.log('slug:', slug);
  const dispatch = useDispatch();

  // Get the specific product state from the Redux store
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  // Fetch product details when the component mounts
  useEffect(() => {
    dispatch(getProductBySlug(slug));

    // Reset the product state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch, slug]);

  return (
    <div>
      <Navbar />
      <div className="container">
        {isLoading && <p>Loading product details...</p>}
        {isError && <p>Error: {message}</p>}
        {product && (
          <div className="product-details">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Display additional product details here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
