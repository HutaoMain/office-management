import React, { useState } from "react";
import { UserInterfaceWithPassword } from "../../Types";
import { Check, Close } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const AddUser = ({ toggleNewUser }: any) => {
  const [userInfo, setUserInfo] = useState<UserInterfaceWithPassword>({
    id: 0,
    email: "",
    fullName: "",
    userRole: "",
    createdDate: new Date(),
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChangeEvent = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        {
          ...userInfo,
        }
      );
      setLoading(false);
      toast.success("Sucessfully added a user!", {
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
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add User</div>
      <hr style={{ marginBottom: "20px" }} />
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Email</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleOnChangeEvent}
        />
      </div>
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Fullname</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="text"
          name="fullName"
          value={userInfo.fullName}
          onChange={handleOnChangeEvent}
        />
      </div>
      <div className="addproduct-item-list" style={{ width: "98%" }}>
        <label>User Role</label>
        <select
          className="addproduct-input"
          name="userRole"
          value={userInfo.userRole}
          onChange={handleOnChangeEvent}
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Password</label>
        <input
          className="addproduct-input"
          style={{ width: "95%" }}
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleOnChangeEvent}
        />
      </div>
      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleNewUser}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> {loading ? "Please wait..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddUser;
