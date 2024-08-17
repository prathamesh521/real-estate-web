import React from 'react'
import { useParams } from "react-router-dom";
import { products } from "../data";

const DetailPage = () => {
    const { id } = useParams();
    console.log('id:', id);

    const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
    }
    return (
        <div className="container">
          <div className="card">
            <img src={product.imageSrc} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
        </div>
      );
}

export default DetailPage