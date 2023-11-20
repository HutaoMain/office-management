import { ProductInterface } from "../../../Types";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewProduct.css";
import { Check, Close } from "@mui/icons-material";
import { useCartStore } from "../../../zustand/CartStore";

interface Props {
  toggleViewProduct: any;
  paramsId: any;
}

const ViewProduct = ({ toggleViewProduct, paramsId }: Props) => {
  const [productInfo, setProductInfo] = useState<ProductInterface>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    createdDate: new Date(),
    email: "",
    status: "",
    barCode: "",
  });
  const [productQuantity, setProductQuantity] = useState<number>(1);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/product/list/${paramsId}`
      );
      setProductInfo(res.data);
    };
    fetch();
  }, [productQuantity]);

  //

  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (quantity && quantity > 0) {
      addItem(productInfo, quantity);
    } else {
      alert("Quantity is 0");
    }
  };

  useEffect(() => {
    if (productInfo.quantity && productInfo?.quantity === 0) {
      setQuantity(0);
    }
  }, [productInfo]);

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Order Product</div>
      <hr style={{ marginBottom: "20px" }} />

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Barcode</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="name"
          value={productInfo?.barCode}
          disabled
        />
      </div>

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Product Name</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="name"
          value={productInfo?.name}
          disabled
        />
      </div>

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Product Description</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="description"
          value={productInfo?.description}
          disabled
        />
      </div>

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Barcode</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="name"
          value={productInfo?.category}
          disabled
        />
      </div>

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Status</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="email"
          value={productInfo?.status}
          disabled
        />
      </div>

      <section className="addproduct-item-section" style={{ width: "100%" }}>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Product Price</label>
          <input
            className="addproduct-input"
            style={{ width: "95%" }}
            type="text"
            name="price"
            value={productInfo?.price}
            disabled
          />
        </div>

        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Product Quantity</label>
          <input
            className="addproduct-input"
            style={{ width: "95%" }}
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(parseInt(e.target.value))}
          />
        </div>
      </section>

      <div className="view-product-btn">
        <button className="action-btn view" onClick={handleAddToCart}>
          <Check />
          Order
        </button>

        <button className="action-btn delete" onClick={toggleViewProduct}>
          <Close /> Close
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
