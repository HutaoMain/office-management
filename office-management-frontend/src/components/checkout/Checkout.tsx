import "./Checkout.css";
import { useCartStore } from "../../zustand/CartStore";
// import { IndeterminateCheckBox, AddBox } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import SupplyRequest from "../printable/SupplyRequest";
import useAuthStore from "../../zustand/AuthStore";

const Checkout = () => {
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  // const increaseItem = useCartStore((state) => state.increaseItem);
  // const decreaseItem = useCartStore((state) => state.decreaseItem);
  const total = useCartStore((state) => state.total);

  const [open, setOpen] = useState<boolean>(false);

  const itemsToString = JSON.stringify(items);

  const togglePrint = async () => {
    const orderData = {
      products: items.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
      email: user,
      totalPrice: total,
      orderJsonList: itemsToString,
      status: "Pending",
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/order/create`,
        orderData
      );
      window.localStorage.removeItem("cart-storage");
      toast("Successfully ordered!", {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleClosePrint = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <div className="checkout">
      <h1>Check Out</h1>
      <div className="checkout-container">
        <div>
          <h2>Here's what you're getting!</h2>
        </div>
        <hr
          style={{
            border: "3px solid gray",
            marginBottom: "20px",
          }}
        />
        {items?.map((item, key) => (
          <section className="checkout-product" key={item.id}>
            <h1 style={{ padding: "0", margin: "0", paddingRight: "10px" }}>
              {key + 1}
            </h1>
            <label>
              Product Name: <b>{item.name}</b>
            </label>
            <label>
              Product Price: <b>{item.price}</b>
            </label>

            <label>
              Price: <b>{item.price * item.quantity}</b>
            </label>
            <label>
              <button
                className="checkout-cancelbtn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </label>
          </section>
        ))}
      </div>
      <h1>
        TOTAL PRICE: <b>{total}</b>
      </h1>
      <button
        disabled={total === 0}
        className="checkout-btn"
        onClick={togglePrint}
      >
        Checkout
      </button>
      <Dialog open={open} onClose={toggleClosePrint}>
        <DialogContent>
          <SupplyRequest />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
