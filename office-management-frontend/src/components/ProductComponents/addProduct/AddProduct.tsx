import axios from "axios";
import { ProductInterface } from "../../../Types";
import "./AddProduct.css";
import { Close, Check } from "@mui/icons-material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuthStore from "../../../zustand/AuthStore";

interface props {
  toggleProductModal: () => void;
}

const AddProduct = ({ toggleProductModal }: props) => {
  const user = useAuthStore((state) => state.user);

  const [addProductInfo, setAddProductInfo] = useState<ProductInterface>({
    id: 0,
    name: "",
    description: "",
    category: "",
    quantity: 0,
    price: 0,
    createdDate: new Date(),
    email: "",
    status: "Available",
    barCode: "",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setAddProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/product/${
          addProductInfo.category
        }/create`,
        { ...addProductInfo, email: user }
      );
      toast.success("Sucessfully added product!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(addProductInfo);

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Product</div>
      <hr style={{ marginBottom: "20px" }} />

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            height: "63px",
          }}
        >
          Barcode Number
          <input
            className="addproduct-input"
            type="number"
            name="name"
            value={addProductInfo.barCode}
            onChange={(e) => {
              setAddProductInfo((data) => ({
                ...data,
                barCode: e.target.value,
              }));
            }}
          />
        </label>
      </div>

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            height: "63px",
          }}
        >
          Product Name
          <input
            className="addproduct-input"
            type="text"
            name="name"
            value={addProductInfo.name}
            onChange={onChangeHandler}
          />
        </label>
      </div>

      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            height: "63px",
          }}
        >
          Category
          <select
            className="addproduct-input"
            name="category"
            value={addProductInfo.category}
            onChange={(e) => {
              setAddProductInfo((data) => ({
                ...data,
                category: e.target.value,
              }));
            }}
          >
            <option value="">Please Select Product Category</option>
            <option value="Consumable">Consumable</option>
            <option value="Non-Consumable">Non-Consumable</option>
          </select>
        </label>
      </div>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label
          style={{ display: "flex", flexDirection: "column", height: "63px" }}
        >
          Description
          <input
            className="addproduct-input"
            type="text"
            name="description"
            value={addProductInfo.description}
            onChange={onChangeHandler}
          />
        </label>
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label
          style={{ display: "flex", flexDirection: "column", height: "63px" }}
        >
          Status
          <select
            className="addproduct-input"
            name="status"
            value={addProductInfo.status}
            onChange={(e) => {
              setAddProductInfo((data) => ({
                ...data,
                status: e.target.value,
              }));
            }}
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </label>
      </section>

      <section
        className="addproduct-item-section"
        style={{ width: "100%", gap: "15px" }}
      >
        <div className="addproduct-item-list" style={{ width: "48%" }}>
          <label>
            Qty
            <input
              className="addproduct-input addproduct-input-number"
              type="number"
              style={{ width: "100%" }}
              name="quantity"
              value={addProductInfo.quantity}
              onChange={(e) => {
                setAddProductInfo((data) => ({
                  ...data,
                  quantity: parseInt(e.target.value),
                }));
              }}
            />
          </label>
        </div>
        <div className="addproduct-item-list" style={{ width: "48%" }}>
          <label>
            Price
            <input
              className="addproduct-input addproduct-input-number"
              type="number"
              style={{ width: "100%" }}
              name="price"
              value={addProductInfo.price}
              onChange={(e) => {
                setAddProductInfo((data) => ({
                  ...data,
                  price: parseInt(e.target.value),
                }));
              }}
            />
          </label>
        </div>
      </section>
      <hr style={{ marginTop: "20px" }} />
      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleProductModal}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
