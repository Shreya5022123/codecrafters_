import React from "react";
import Product from "./Product";

function ProductList(props) {
  return (
    <div className="container mt-4">
      {props.productList.length > 0 ? (
        props.productList.map((product, i) => (
          <Product
            product={product}
            key={i}
            index={i}
            incrementQuantity={props.incrementQuantity}
            decrementQuantity={props.decrementQuantity}
            removeItem={props.removeItem}
          />
        ))
      ) : (
        <div className="text-center mt-5">
          <h1 className="text-muted">No Products Exist in the Cart</h1>
        </div>
      )}
    </div>
  );
}

export default ProductList;
