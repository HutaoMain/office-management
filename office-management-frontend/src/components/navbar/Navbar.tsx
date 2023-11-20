import "./Navbar.css";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useCartStore } from "../../zustand/CartStore";
import { Drawer } from "antd";
import { useState } from "react";
import Checkout from "../checkout/Checkout";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const cart = useCartStore((state) => state.items);

  const showDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-content-container">
        <Badge
          badgeContent={cart.length}
          sx={{ color: "black", cursor: "pointer" }}
          color="error"
          onClick={showDrawer}
        >
          <ShoppingCart sx={{ color: "black" }} />
        </Badge>
      </div>

      <Drawer placement="right" onClose={onCloseDrawer} open={open}>
        <Checkout />
      </Drawer>
    </div>
  );
};

export default Navbar;
