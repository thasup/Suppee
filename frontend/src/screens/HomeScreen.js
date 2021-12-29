import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions.js";

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {products.length === 0 ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products.map((item) => (
                        <Col key={item._id} sm={12} md={6} xl={3}>
                            <Product product={item} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;
