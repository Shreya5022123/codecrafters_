import React, { useState } from 'react';
import ARCanvas from './ARScene'; // Import ARCanvas component

function Product(props) {
  const [arActive, setArActive] = useState(false);

  const handleArView = () => {
    setArActive(!arActive);
  };

  return (
    <div className="row product-row border-bottom py-3">
      <div className="col-12 col-md-2 mb-3 mb-md-0 text-center">
        <img
          src={props.product.image}
          alt={props.product.name}
          className="img-fluid product-image"
        />
      </div>
      <div className="col-12 col-md-4 d-flex flex-column justify-content-center">
        <h2 className="mb-2">{props.product.name}</h2>
        <h3 className="text-muted mb-3">Price: ₹{props.product.price}</h3>
        <div className="btn-group" role="group" aria-label="Quantity">
          <button
            type="button"
            className="btn btn-danger btn-sm mr-2"
            onClick={() => {
              props.decrementQuantity(props.index);
            }}
          >
            -
          </button>
          <button type="button" className="btn btn-warning btn-sm mx-2">
            {props.product.quantity}
          </button>
          <button
            type="button"
            className="btn btn-success btn-sm ml-2"
            onClick={() => {
              props.incrementQuantity(props.index);
            }}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleArView}
        >
          {arActive ? 'Close AR View' : 'AR View'}
        </button>
        <button
          className="btn btn-danger mt-2"
          onClick={() => {
            props.removeItem(props.index);
          }}
        >
          Remove
        </button>
      </div>
      <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
        <h4 className="m-0">Total: ₹{props.product.quantity * props.product.price}</h4>
      </div>
      {arActive && (
        <div className="col-12 mt-3">
          <ARCanvas modelUrl={props.product.modelUrl} /> {/* Pass the model URL */}
        </div>
      )}
    </div>
  );
}

export default Product;
