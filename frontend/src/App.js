import React from "react";
import HomePage from "./Components/HomePage";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import ProductPage from "./Components/ProductPage";
import ProductDetails from "./Components/ProductDetails";
import { Helmet } from "react-helmet-async";
import Cart from "./Components/Cart";
import Cartpage from "./Components/Cartpage";
import Payment from "./Components/Payment";
import Login from "./Components/Login";
import WishList from "./Components/Wishlist";
import { ToastContainer, } from 'react-toastify';
import { Container } from "react-bootstrap";
import Shipping from "./Components/Shipping";
import Placeorder from "./Components/Placeorder";
import SignUpPage from "./Components/SignUpPage";
import Order from "./Components/Order";



function App() {
  return (
    <>
    <Helmet>
        <title>Easyy</title>
      </Helmet>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/products" element={<ProductPage/>}></Route>
    <Route path="/products/:slug" element={<ProductDetails/>}></Route>
    <Route path="/products/:slug" element={<ProductDetails/>}></Route>
    <Route path="/cart" element={<Cart/>}></Route>
    <Route path="/cartpage" element={<Cartpage/>}></Route>
    <Route path="/payment" element={<Payment/>}></Route>
    <Route path="/signin" element={<Login/>}></Route>
    <Route path="/wishlist" element={<WishList/>}></Route>
      <Route path="/shipping" element={<Shipping/>} ></Route>
      <Route path="/placeorder" element={<Placeorder/>} ></Route>
      <Route path="/signup" element={<SignUpPage/>} ></Route>
      <Route path="/orders/:id" element={<Order/>} ></Route>
  </Routes>
  <Container>
  <ToastContainer position='bottom-center' limit={1} />
  </Container>
</BrowserRouter>
    </>
  );
}

export default App;
