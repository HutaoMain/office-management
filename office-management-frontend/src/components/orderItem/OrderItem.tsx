/* eslint no-eval: 0 */
import { useEffect, useState } from "react";
import "./OrderItem.css";
import axios from "axios";
import moment from "moment";
import { OrderInterface, ProductInterface } from "../../Types";

interface Prop {
  id: string;
}

const OrderItem = ({ id }: Prop) => {
  const [orderData, setOrderData] = useState<OrderInterface>();
  const [arrayOfObjects, setArrayOfObjects] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/order/list/${id}`
      );
      setOrderData(res.data);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    setArrayOfObjects(eval(orderData?.orderJsonList || ""));
  }, [orderData?.orderJsonList]);

  return (
    <div className="orderItem">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <span
          style={{ float: "left", fontWeight: "500", fontSize: "20px" }}
          className="order-id"
        >
          Order ID: {orderData?.id}
        </span>
        <span style={{ fontSize: "20px" }}>
          Order Date:{" "}
          {moment(orderData?.createdDate, "YYYY-MM-DD HH:mm:ss").format(
            "YYYY-MM-DD hh:mma"
          )}
        </span>
        {/* <span className="orderStatus" style={{ fontSize: "20px" }}>
          {orderData?.status}
        </span> */}
      </div>

      <div className="orderHorizontalLine"></div>
      {arrayOfObjects?.map((arrayItem) => {
        return (
          <div key={arrayItem.id}>
            <div className="orderContainer">
              <div className="orderProductImageContainer"></div>
              <div className="orderDetailsContainer">
                <h1 className="orderProductName">
                  <i>Product Name:</i> {arrayItem.name || arrayItem.name}
                </h1>
                <span className="orderQuanitty">
                  <i>Quantity: </i>
                  {arrayItem.name ? "1" : arrayItem.quantity}
                </span>
              </div>
              <span className="orderProductPrice">
                <i>Price:</i> ₱ {arrayItem.price}.00
              </span>
            </div>
            <div className="orderHorizontalLineInside"></div>
          </div>
        );
      })}
      {/* <div>
        <h1 className="orderTotalPrice">
          <i>Order Total:</i> ₱ {item.totalPrice}.00
        </h1>
      </div>
      {item.status === "Pending" && (
        <div className="orderSubmitProofContainer">
          <div style={{ marginTop: "5px" }}>
            <button
              className="orderItemSubmitBtn"
              // onClick={handlePutImageInOrder}
              onClick={toggleOrPayment}
            >
              Upload Proof of Payment
            </button>
          </div>
        </div>
      )}
      {item.status === "ToShip" && (
        <div>
          <span>tracking # here: </span>
          {item?.trackingNum}
          <span style={{ marginLeft: "10px" }}>
            Please track your order here {"   "}
            {item?.courier}
          </span>
        </div>
      )}
      <Modal
        isOpen={open}
        onRequestClose={toggleOrPayment}
        contentLabel="My dialog"
        style={customStyle}
        close
      >
     
        <SubmitOrImage item={item} close={toggleOrPayment} />
      </Modal> */}
    </div>
  );
};

export default OrderItem;
