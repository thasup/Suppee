import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route    POST /api/orders
// @access    Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });

        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
});

// @desc    Get order by ID
// @route    GET /api/orders/:id
// @access    Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    // Check if the request was from an admin or if the order user ID was equal to the request user ID
    if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update order to paid
// @route    GET /api/orders/:id/pay
// @access    Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    // Check if the request was from an admin or if the order user ID was equal to the request user ID
    if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

export { addOrderItems, getOrderById, updateOrderToPaid };
