import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="pt-3 pb-5">
                <Container>
                    <Routes>
                        <Route path="/order/:id" element={<OrderScreen />} />
                        <Route path="/shipping" element={<ShippingScreen />} />
                        <Route path="/payment" element={<PaymentScreen />} />
                        <Route
                            path="/placeorder"
                            element={<PlaceOrderScreen />}
                        />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route
                            path="/product/:id"
                            element={<ProductScreen />}
                        />
                        <Route path="/cart">
                            <Route path=":id" element={<CartScreen />} />
                            <Route path="" element={<CartScreen />} />
                        </Route>
                        <Route
                            path="/admin/userlist"
                            element={<UserListScreen />}
                        />
                        <Route
                            path="/admin/user/:id/edit"
                            element={<UserEditScreen />}
                        />
                        <Route path="/admin/productlist">
                            <Route path="" element={<ProductListScreen />} />
                            <Route
                                path=":pageNumber"
                                element={<ProductListScreen />}
                            />
                        </Route>
                        <Route
                            path="/admin/product/:id/edit"
                            element={<ProductEditScreen />}
                        />
                        <Route
                            path="/admin/orderlist"
                            element={<OrderListScreen />}
                        />
                        <Route
                            path="/search/:keyword"
                            element={<HomeScreen />}
                        />
                        <Route
                            path="/search/:keyword/page/:pageNumber"
                            element={<HomeScreen />}
                        />
                        <Route
                            path="/page/:pageNumber"
                            element={<HomeScreen />}
                        />
                        <Route path="/" element={<HomeScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
