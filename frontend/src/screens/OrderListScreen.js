import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // const userDelete = useSelector((state) => state.userDelete);
    // const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            // dispatch(deleteUser(id));
        }
    };

    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        <>
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            ></i>{" "}
                                            {order.paidAt.substring(0, 10)}
                                        </>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <>
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            ></i>{" "}
                                            {order.deliveredAt.substring(0, 10)}
                                        </>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td className="d-flex justify-content-center">
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button
                                            variant="dark"
                                            className="btn-sm mx-1"
                                        >
                                            <i className="fas fa-info-circle"></i>{" "}
                                            Details
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm mx-1"
                                        onClick={() => deleteHandler(order._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;
