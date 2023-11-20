import { IconButton, InputBase } from "@mui/material";
import { UserInterface } from "../../Types";
import { useQuery } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { Add, Search } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Modal from "react-modal";
import AddUser from "../../components/UserComponent/AddUser";
import useAuthStore from "../../zustand/AuthStore";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
    width: "400px",
    height: "380px",
  },
  overlay: {
    zIndex: 1000,
  },
};

const UserPage = () => {
  const { data } = useQuery<UserInterface[]>({
    queryKey: ["UserPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/list`)
        .then((res) => res.data),
  });

  const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);

  const toggleNewUser = () => {
    setIsAddUserOpen(!isAddUserOpen);
  };

  const user = useAuthStore((state) => state.user);

  const [userData, setUserData] = useState<UserInterface>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${user}`
      );
      setUserData(res.data);
    };
    fetchData();
  }, []);

  const productColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Full name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "userRole",
      headerName: "User role",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filtered = data?.filter((item) => {
    return item?.email?.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
        {userData?.userRole === "admin" && (
          <button className="add-product-btn" onClick={toggleNewUser}>
            Add User <Add />
          </button>
        )}
      </div>
      <section className="product-page-datagrid">
        <DataGrid
          rows={filtered ?? []}
          columns={productColumn}
          getRowId={(row) => row.id}
        />
      </section>
      <Modal
        isOpen={isAddUserOpen}
        onRequestClose={toggleNewUser}
        style={customStyle}
      >
        <AddUser toggleNewUser={toggleNewUser} />
      </Modal>
    </div>
  );
};

export default UserPage;
