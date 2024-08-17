import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { products } from "../data";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-md-6 col-lg-4">
              <div class="card">
                <img src={product.imageSrc} class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-text">{product.description}</p>
                  <Link to={`/property/${product.id}`} class="btn btn-primary">
                    Go somewhere
                  </Link>
                </div>
              </div>
            </div>
          ))}
         
        </div>
      </div>
    </div>
  );
};

export default Home;
