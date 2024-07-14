import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList.js";
import Footer from "./components/Footer.js";
import AddItem from "./components/AddItem";
// import jeans from "./img/jeans.png";
// import top from "./img/huddie.jpg";

function App() {
  const products = [
    {
      price: 9000,
      name: "jeans",
      quantity: 0,
      image: "https://media.sketchfab.com/models/3b74e0d980754027bacbfd17b8dd0260/thumbnails/38a92b0ff82f4181b0648d16a3a2da77/bf1bc932a68c465f910fed1ce2f3a1e8.jpeg", // Example path to image file
    },
    {
      price: 1000,
      name: "huddie",
      quantity: 0,
      image: "https://media.sketchfab.com/models/bc387203ef184f2dbd25b236945857c5/thumbnails/3a47d6d3aa7a40f1b15dcae4a6c76ab6/fdf8df047b4847babd22a4c7da83d07e.jpeg", // Example path to image file
    },
  ];
  

  let [productList, setProductList] = useState(products);
  let [totalAmount, setTotalAmount] = useState(0);

  const incrementQuantity = (index) => {
    let newProductList = [...productList];
    let newTotalAmount = totalAmount;
    newProductList[index].quantity++;
    newTotalAmount += newProductList[index].price;
    setTotalAmount(newTotalAmount);
    setProductList(newProductList);
  };

  const decrementQuantity = (index) => {
    let newProductList = [...productList];
    let newTotalAmount = totalAmount;
    if (newProductList[index].quantity > 0) {
      newProductList[index].quantity--;
      newTotalAmount -= newProductList[index].price;
    }
    setTotalAmount(newTotalAmount);
    setProductList(newProductList);
  };

  const resetQuantity = () => {
    let newProductList = [...productList];
    newProductList.forEach((product) => {
      product.quantity = 0;
    });
    setProductList(newProductList);
    setTotalAmount(0);
  };

  const removeItem = (index) => {
    let newProductList = [...productList];
    let newTotalAmount = totalAmount - (newProductList[index].quantity * newProductList[index].price);
    newProductList.splice(index, 1);
    setProductList(newProductList);
    setTotalAmount(newTotalAmount);
  };

  const addItem = (name, price) => {
    let newProductList = [...productList];
    newProductList.push({
      price: price,
      name: name,
      quantity: 0,
    });
    setProductList(newProductList);
  };

  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <AddItem addItem={addItem} />
        <ProductList
          productList={productList}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeItem={removeItem}
        />
      </main>
      <Footer totalAmount={totalAmount} resetQuantity={resetQuantity} />
    </>
  );
}

export default App;
