import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import user from "./data/user.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(user);

        const adminUser = createdUser[0]._id;

        const sampleProducts = products.map((item) => {
            return {
                ...item,
                user: adminUser,
            };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
