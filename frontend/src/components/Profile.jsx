import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { getUserProducts, deleteProduct, reset } from "../features/products/productSlice";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();

  // Get products state from the Redux store
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(getUserProducts());

    // Optionally reset the state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Handle product deletion
  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(slug));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.slug} className="col-12 col-md-6 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <Link to={`/products/${product.slug}`}>{product.name}</Link>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>

                    <div className="buttons">
                      <Link to={`/products/${product.slug}/edit`}>
                        <button className="btn btn-primary">Edit</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.slug)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
