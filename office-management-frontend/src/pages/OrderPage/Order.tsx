import {
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
} from "@mui/material";
import { OrderInterface } from "../../Types";
import { useQuery } from "react-query";
import useAuthStore from "../../zustand/AuthStore";
import axios from "axios";
import moment from "moment";
import { ManageSearch, Search } from "@mui/icons-material";
import { useState } from "react";
import PurchaseRequest from "../../components/printable/PurchaseRequest";

const Order = () => {
  const user = useAuthStore((state) => state.user);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpenViewProduct, setIsOpenViewProduct] = useState<boolean>(false);
  const [paramsId, setParamsId] = useState<string>("");

  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["OrderPage"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/${user}`)
        .then((res) => res.data),
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleViewProduct = (id: any) => {
    setParamsId(id);
    setIsOpenViewProduct(!isOpenViewProduct);
  };

  const filtered = data?.filter((item) => {
    return item.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-page">
      <h1>Order Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Department Email"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: "500px",
            border: "2px solid black",
            padding: "0 20px",
          }}
          endAdornment={
            <IconButton>
              <Search />
            </IconButton>
          }
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#003580", color: "white" }}>
            <TableRow>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Department Email
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Total Price
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Date Ordered
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="assessment-tablebody">
            {filtered?.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.totalPrice}</TableCell>
                <TableCell align="center">
                  {moment(item.createdDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="action-btn view"
                      onClick={() => toggleViewProduct(item.id)}
                    >
                      <ManageSearch />
                      View
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isOpenViewProduct}
        onClose={toggleViewProduct}
        maxWidth="lg"
      >
        <DialogContent>
          <PurchaseRequest id={paramsId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Order;
