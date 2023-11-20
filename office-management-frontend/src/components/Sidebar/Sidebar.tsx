import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { Person } from "@mui/icons-material";
import useAuthStore from "../../zustand/AuthStore";

const Sidebar = () => {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);

  const clearUser = useAuthStore((state) => state.clearUser);

  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top-admin">
        <Person sx={{ fontSize: "40px" }} />
        <span
          style={{ wordWrap: "break-word", width: "75%", textAlign: "center" }}
        >
          {user}
        </span>
      </div>

      <hr className="sidebar-hr" />
      <div className="sidebar-center">
        <ul>
          <p className="sidebar-title">Dashboard</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/" ? "sidebar-active" : ""}>
              <span
                className={
                  location.pathname === "/"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Dashboard
              </span>
            </li>
          </Link>

          <p className="sidebar-title">Admin Inventory</p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/products" ? "sidebar-active" : ""
              }
            >
              <span
                className={
                  location.pathname === "/products"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Products
              </span>
            </li>
          </Link>

          <p className="sidebar-title">Department Inventory </p>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/orders" ? "sidebar-active" : ""
              }
            >
              <span
                className={
                  location.pathname === "/orders"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Orders
              </span>
            </li>
          </Link>

          <p className="sidebar-title">User Security</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li
              className={location.pathname === "/users" ? "sidebar-active" : ""}
              onClick={toggleModal}
            >
              <span
                className={
                  location.pathname === "/users"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Users
              </span>
            </li>
          </Link>

          <li style={{ marginTop: "10px" }} onClick={clearUser}>
            <span className="sidebar-title-span">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
