import Cart from "../models/Cart.js";

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;

    const userId = req.user._id;

    let item = await Cart.findOne({
      user: userId,
      book: bookId,
    });

    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      item = await Cart.create({
        user: userId,
        book: bookId,
        quantity: 1,
      });
    }

    res.status(201).json({
      success: true,
      message: "Book added to cart",
      data: item,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {

    const cart = await Cart.find({
      user: req.user._id,
    }).populate("book");

    res.json({
      success: true,
      data: cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Item
export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};