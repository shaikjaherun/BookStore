import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      toast.success("Item Removed");
      fetchCart();
    } catch (error) {
      toast.error("Failed");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-card" key={item._id}>

              <img
                src={item.book.image}
                alt={item.book.title}
              />

              <div className="cart-info">

                <h2>{item.book.title}</h2>

                <p>{item.book.author}</p>

                <h3>₹{item.book.price}</h3>

                <p>Quantity : {item.quantity}</p>

                <button
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          <div className="cart-total">

            <h2>Total : ₹{total}</h2>

            <Link to="/checkout">
              <button>Proceed To Checkout</button>
            </Link>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;