import React from "react";

export default function Footer(props) {
  return (
    <div className="row mt-4 align-items-center justify-content-center">
      <button
        className="btn btn-danger col-6 col-md-2 mb-2 mb-md-0"
        onClick={() => {
          props.resetQuantity();
        }}
      >
        Reset
      </button>
      <div className="col-12 col-md-6 bg-dark text-white text-center py-2 mb-2 mb-md-0">
        Total: ₹{props.totalAmount}
      </div>
      <button className="btn btn-primary col-6 col-md-2">Pay Now</button>
    </div>
  );
}
