import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">

      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (

        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Your placed orders will appear here.</p>
        </div>

      ) : (

        orders.map((order) => (

          <div className="order-card" key={order._id}>

            <div className="order-header">

              <div>
                <h3>Order ID</h3>
                <span>{order._id}</span>
              </div>

              <div className="status">
                {order.status}
              </div>

            </div>

            {order.items.map((item) => (

              <div className="order-item" key={item._id}>

                <img
                  src={item.book.image}
                  alt={item.book.title}
                />

                <div className="order-details">

                  <h2>{item.book.title}</h2>

                  <p>
                    <strong>Author:</strong> {item.book.author}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>

                  <h3>₹{item.book.price}</h3>

                </div>

              </div>

            ))}

            <div className="order-footer">

              <div>

                <p>
                  <strong>Payment :</strong>{" "}
                  {order.paymentMethod}
                </p>

                <p>
                  <strong>Delivery :</strong>{" "}
                  {order.address}
                </p>

              </div>

              <div className="total-price">
                Total : ₹{order.totalPrice}
              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Orders;