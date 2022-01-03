import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

const UserEditScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const match = useParams();
    const userId = match.id;
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="my-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email" className="my-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isadmin" className="my-3">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                            className="my-3"
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
