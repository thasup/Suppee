import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions.js";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const match = useParams();
    const keyword = match.keyword;
    const pageNumber = match.pageNumber || 1;

    const productList = useSelector((state) => state.productList);
    const { error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <h1>Latest Products</h1>
            {products.length === 0 ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((item) => (
                            <Col key={item._id} sm={12} md={6} xl={3}>
                                <Product product={item} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        page={page}
                        pages={pages}
                        keyword={keyword ? keyword : ""}
                    />
                </>
            )}
        </>
    );
};

export default HomeScreen;
