import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
    listProductDetails,
    createProductReview,
    deleteProductReview,
} from "../actions/productActions.js";
import {
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_DELETE_REVIEW_RESET,
} from "../constants/productConstants";
import LoaderSmall from "../components/LoaderSmall";

const ProductScreen = () => {
    const match = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const productDetails = useSelector((state) => state.productDetails);
    const { error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    const { success: successProductReview, error: errorProductReview } =
        productReviewCreate;

    const productReviewDelete = useSelector(
        (state) => state.productReviewDelete
    );
    const {
        loading: loadingDeleteProductReview,
        success: successDeleteProductReview,
        error: errorDeleteProductReview,
    } = productReviewDelete;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        if (successDeleteProductReview) {
            dispatch({ type: PRODUCT_DELETE_REVIEW_RESET });
        }

        dispatch(listProductDetails(match.id));
    }, [dispatch, match, successDeleteProductReview, successProductReview]);

    const addToCartHandler = () => {
        navigate(`/cart/${match.id}?qty=${qty}`);
    };

    const submitReviewHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(match.id, {
                rating,
                comment,
            })
        );
    };

    const deleteReviewHandler = (review) => {
        if (userInfo && review.user === userInfo._id) {
            dispatch(deleteProductReview(match.id));
        } else {
            alert("Not allow");
        }
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {!product._id || product._id !== match.id ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="my-2">Description:</div>
                                    <div>{product.description}</div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        className="form-select"
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((obj) => (
                                                            <option
                                                                key={obj + 1}
                                                                value={obj + 1}
                                                            >
                                                                {obj + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item className="d-grid">
                                        <Button
                                            onClick={addToCartHandler}
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    {errorDeleteProductReview && (
                        <Message variant="danger">
                            {errorDeleteProductReview}
                        </Message>
                    )}
                    <Row className="mt-3">
                        <Col md={6}>
                            {loadingDeleteProductReview && <LoaderSmall />}
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && (
                                <Message variant="secondary">
                                    No Reviews
                                </Message>
                            )}
                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <Row className="">
                                            <Col>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                <p>
                                                    {review.createdAt.substring(
                                                        0,
                                                        10
                                                    )}
                                                </p>
                                                <p>{review.comment}</p>
                                            </Col>
                                            {review.user === userInfo._id && (
                                                <Col className="col-1 justify-content-end">
                                                    <i
                                                        className="fas fa-trash btn-del"
                                                        onClick={() =>
                                                            deleteReviewHandler(
                                                                review
                                                            )
                                                        }
                                                    ></i>
                                                </Col>
                                            )}
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                                {!product.reviews.some(
                                    (review) => review.user === userInfo._id
                                ) && (
                                    <ListGroup className="mt-3">
                                        <h2>Write a Review</h2>
                                        {errorProductReview && (
                                            <Message variant="danger">
                                                {errorProductReview}
                                            </Message>
                                        )}
                                        {userInfo ? (
                                            <Form
                                                onSubmit={submitReviewHandler}
                                            >
                                                <Form.Group
                                                    controlId="rating"
                                                    className="my-3"
                                                >
                                                    <Form.Label>
                                                        Rating
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        className="form-select"
                                                        value={rating}
                                                        onChange={(e) =>
                                                            setRating(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Select...
                                                        </option>
                                                        <option value="1">
                                                            1 - Poor
                                                        </option>
                                                        <option value="2">
                                                            2 - Fair
                                                        </option>
                                                        <option value="3">
                                                            3 - Good
                                                        </option>
                                                        <option value="4">
                                                            4 - Very Good
                                                        </option>
                                                        <option value="5">
                                                            5 - Excellent
                                                        </option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group
                                                    controlId="comment"
                                                    className="my-3"
                                                >
                                                    <Form.Label>
                                                        Comment
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        row="3"
                                                        value={comment}
                                                        onChange={(e) =>
                                                            setComment(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message>
                                                Please{" "}
                                                <Link to="/login">sign in</Link>{" "}
                                                to write a review
                                            </Message>
                                        )}
                                    </ListGroup>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
