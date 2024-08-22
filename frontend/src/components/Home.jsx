import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { getProducts, reset } from "../features/products/productSlice";

import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  // Get products state from the Redux store
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(getProducts());

    // Optionally reset the state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>

  
      </div>
    </div>
  );
};

export default Home;
