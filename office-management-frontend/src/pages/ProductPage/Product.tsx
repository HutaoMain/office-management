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
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ProductInterface, UserInterface } from "../../Types";
import moment from "moment";
import { Add, Search } from "@mui/icons-material";
import useAuthStore from "../../zustand/AuthStore";
import "./Product.css";
import AddProduct from "../../components/ProductComponents/addProduct/AddProduct";
import ViewProduct from "../../components/ProductComponents/ViewProduct/ViewProduct";
import BarcodeReader from "../../components/barcodeReader/BarcodeReader";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [barcodeData, setBarcodeData] = useState<string>("");
  const [userData, setUserData] = useState<UserInterface>();
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [paramsId, setParamsId] = useState<string>("");
  const [isOpenViewProduct, setIsOpenViewProduct] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);

  const { data } = useQuery<ProductInterface[]>({
    queryKey: ["Product"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/list`)
        .then((res) => res.data),
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${user}`
      );
      setUserData(res.data);
    };
    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = data?.filter((item) => {
    if (barcodeData) {
      return item?.barCode?.toLowerCase()?.includes(barcodeData);
    } else {
      return item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    }
  });

  const toggleProductModal = () => {
    setIsProductModalOpen(!isProductModalOpen);
  };

  const toggleViewProduct = (id: any) => {
    setParamsId(id);
    setIsOpenViewProduct(!isOpenViewProduct);
  };

  return (
    <>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Product Name"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: "400px",
            border: "2px solid black",
            padding: "0 20px",
          }}
          endAdornment={
            <IconButton>
              <Search />
            </IconButton>
          }
        />
        {userData?.userRole === "admin" && (
          <button className="add-product-btn" onClick={toggleProductModal}>
            Add Product <Add />
          </button>
        )}
      </div>
      <TableContainer>
        <BarcodeReader setBarcodeData={setBarcodeData} />
        <Table>
          <TableHead sx={{ backgroundColor: "#003580", color: "white" }}>
            <TableRow>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Barcode
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Product Name
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Price
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Quantity
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Description
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Category
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Date Added
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Status
              </TableCell>
              {userData?.userRole !== "admin" && (
                <TableCell
                  className="assessment-header"
                  align="center"
                  sx={{ color: "white" }}
                >
                  Action Button
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody className="assessment-tablebody">
            {filtered?.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.barCode}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">{item.category}</TableCell>
                <TableCell align="center">
                  {moment(item.createdDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="center">{item.status}</TableCell>
                {userData?.userRole !== "admin" && (
                  <TableCell>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button onClick={() => toggleViewProduct(item.id)}>
                        Order Product
                      </button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* view product */}
      <Dialog open={isOpenViewProduct} onClose={toggleViewProduct}>
        <DialogContent>
          <ViewProduct
            toggleViewProduct={toggleViewProduct}
            paramsId={paramsId}
          />
        </DialogContent>
      </Dialog>
      {/* add product */}
      <Dialog open={isProductModalOpen} onClose={toggleProductModal}>
        <DialogContent>
          <AddProduct toggleProductModal={toggleProductModal} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Product;
