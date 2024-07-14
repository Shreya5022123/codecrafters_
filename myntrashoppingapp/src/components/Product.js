import React from "react";

function Product(props) {
  return (
    <div className="row product-row border-bottom py-3">
      <div className="col-12 col-md-2 mb-3 mb-md-0 text-center">
        <img src={props.product.image} alt={props.product.name} className="img-fluid product-image" />
      </div>
      <div className="col-12 col-md-3 d-flex align-items-center">
        <div>
          <h2 className="mb-2">{props.product.name}</h2>
          <h3 className="text-muted mb-3">Price: ₹{props.product.price}</h3>
          <div className="btn-group" role="group" aria-label="Quantity">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                props.decrementQuantity(props.index);
              }}
            >
              -
            </button>
            <button type="button" className="btn btn-warning">
              {props.product.quantity}
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                props.incrementQuantity(props.index);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
        <h4 className="m-0">₹{props.product.quantity * props.product.price}</h4>
      </div>
      <div className="col-6 col-md-2 d-flex align-items-center justify-content-center">
        <button
          className="btn btn-danger w-100"
          onClick={() => {
            props.removeItem(props.index);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Product;
