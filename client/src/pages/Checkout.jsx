import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    address: "",
    paymentMethod: "Cash On Delivery",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/orders", form);

      toast.success(res.data.message);

      await Swal.fire({
        icon: "success",
        title: "🎉 Order Placed!",
        text: "Thank you for shopping with BookStore.",
        confirmButtonColor: "#2563eb",
      });

      navigate("/orders");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to place order"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-card">

        <h1>Checkout</h1>

        <form onSubmit={placeOrder}>

          <textarea
            name="address"
            rows="5"
            placeholder="Enter Delivery Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option>Cash On Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;