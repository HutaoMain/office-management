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
import { useState } from "react";
import { useQuery } from "react-query";
import { UserInterface } from "../../Types";
import axios from "axios";
import { Add, Search } from "@mui/icons-material";
import moment from "moment";
import AddUser from "../../components/UserComponent/AddUser";
import { toast } from "react-toastify";

const User = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);

  const { data } = useQuery<UserInterface[]>({
    queryKey: ["UserPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/list`)
        .then((res) => res.data),
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = data?.filter((item) => {
    return item?.email?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleNewUser = () => {
    setIsAddUserOpen(!isAddUserOpen);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/user/delete/${id}`
      );
      toast("Successfully deleted user!", {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-page">
      <h1>User Page</h1>
      <div className="product-search-btn">
        <InputBase
          placeholder="Search by Email"
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

        <button className="add-product-btn" onClick={toggleNewUser}>
          Add User <Add />
        </button>
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
                Full name
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                User role
              </TableCell>
              <TableCell
                className="assessment-header"
                align="center"
                sx={{ color: "white" }}
              >
                Created Date
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
                <TableCell align="center">{item.fullName}</TableCell>
                <TableCell align="center">{item.userRole}</TableCell>
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
                      className="action-btn"
                      style={
                        item.email === "admin@gmail.com"
                          ? {
                              backgroundColor: "#ebebe4",
                              cursor: "not-allowed",
                            }
                          : { backgroundColor: "#c70000 " }
                      }
                      disabled={item.email === "admin@gmail.com"}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isAddUserOpen} onClose={toggleNewUser} maxWidth="lg">
        <DialogContent>
          <AddUser toggleNewUser={toggleNewUser} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default User;
