import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    const cart = await Cart.find({
      user: req.user._id,
    }).populate("book");

    if (cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is Empty",
      });
    }

    const items = cart.map((item) => ({
      book: item.book._id,
      quantity: item.quantity,
    }));

    const totalPrice = cart.reduce(
      (sum, item) =>
        sum + item.book.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      address,
      paymentMethod,
    });

    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      data: order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My Orders
export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.book")
      .sort("-createdAt");

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};