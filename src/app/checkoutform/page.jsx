'use client'
import { useState, useContext } from 'react'
import './checkoutform.css'
import { ShopContext } from '../../context/ShopContextValue'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const CheckoutForm = () => {
  const { cartItems, getTotalCartAmount, clearCart } = useContext(ShopContext)
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // cartItems: { "itemId_size": qty } → orderItems array
    // NOTE: "size" tabhi backend save karega jab OrderItemsm schema mein size field ho (upar dekho)
    const orderItems = Object.entries(cartItems)
      .filter(([_, qty]) => qty > 0)
      .map(([key, quantity]) => {
        const [itemId, size] = key.split("_");
        return { productId: itemId, size, quantity };
      });

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // CHANGE: Orderm schema ke exact structure ke hisaab se — guestInfo, shippingAddress, totalAmount
    const orderPayload = {
      guestInfo: {
        name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        email: formData.get("email"),
        phone: formData.get("phone"),
      },
      shippingAddress: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        postalCode: formData.get("postalCode"),
      },
      totalAmount: getTotalCartAmount(),
      paymentMethod,
      orderItems, // controller isko alag se OrderItemsm mein insert karega
    };

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");

      toast.success("Order Placed Successfully!");
      clearCart();
      router.push(`/order-confirmation/${data.order._id}?email=${encodeURIComponent(orderPayload.guestInfo.email)}`);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getTotalCartAmount()

  return (
    <div className="checkout-page-container">
      <div className="checkout-layout">

        <form className="checkout-form" onSubmit={handleSubmit}>

          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="yourname@example.com" required />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="+92 3000000000" required />
            </div>
          </div>

          <div className="form-section">
            <h2>Shipping Address</h2>
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="First name" required />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="Last name" required />
              </div>
            </div>

            <div className="input-group">
              <label>Address</label>
              <input type="text" name="address" placeholder="House, Appartment etc" required />
            </div>

            <div className="input-row matrix">
              <div className="input-group">
                <label>City</label>
                <input type="text" name="city" placeholder="city name" required />
              </div>
              <div className="input-group">
                <label>State / Province</label>
                <input type="text" name="state" placeholder="state / province" required />
              </div>
              <div className="input-group">
                <label>Postal Code</label>
                <input type="text" name="postalCode" placeholder="00000" required />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className="payment-radio-label">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span>Cash on Delivery (COD)</span>
              </label>

              <label className="payment-radio-label">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span>Credit / Debit Card</span>
              </label>

              {paymentMethod === "card" && (
                <div className="card-details-form">
                  <div className="input-group">
                    <input type="text" name="cardNumber" placeholder="Card number" required />
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <input type="text" name="expiry" placeholder="Expiration date (MM / YY)" required />
                    </div>
                    <div className="input-group">
                      <input type="text" name="cvc" placeholder="Security code" required />
                    </div>
                  </div>
                  <div className="input-group">
                    <input type="text" name="cardName" placeholder="Name on card" />
                  </div>
                  <label className="billing-checkbox">
                    <input type="checkbox" defaultChecked required />
                    <span>Use shipping address as billing address</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="checkout-summary-panel">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-tag">Free</span>
          </div>
          <hr />
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutForm