import { useQuery } from "react-query";
import { ProductInterface } from "../../Types";
import axios from "axios";
import { ArrowDropUp } from "@mui/icons-material";

const ProductCount = () => {
  const { data } = useQuery<ProductInterface[]>({
    queryKey: ["ProductCount"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/list`)
        .then((res) => res.data),
  });

  return (
    <div
      style={{
        width: "240px",
        height: "120px",
        border: "1px solid #5A9DAD",
        backgroundColor: "#F2F3F7",
        display: "flex",
        justifyContent: "center",
        paddingLeft: "40px",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0px",
          padding: "0px",
        }}
      >
        <p style={{ fontSize: "30px", margin: "0px", padding: "0px" }}>
          {data?.length}
        </p>
        <ArrowDropUp sx={{ color: "#FDB803", fontSize: "50px" }} />
      </div>
      <h3 style={{ margin: "0px", padding: "0px" }}>
        Departments's Total Products
      </h3>
    </div>
  );
};

export default ProductCount;
