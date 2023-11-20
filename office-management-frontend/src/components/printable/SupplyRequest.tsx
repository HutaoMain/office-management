import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCartStore } from "../../zustand/CartStore";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const SupplyRequest = () => {
  const items = useCartStore((state) => state.items);

  const total = useCartStore((state) => state.total);

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
        ref={componentRef}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <section
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1>Supply Request</h1>
            <span>Bangsamoro Autonomous Region in Muslim Mindanao</span>
            <span>Ministry of trade, Investment and Tourism</span>
            <span>Maguindanao Provincial Office</span>
            <span>El Marco Building Sinsuat Avenue, MBRH, Cotabato City</span>
          </section>
          <section
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "#3B4E87",
                color: "white",
                padding: "10px 30px 10px 30px",
              }}
            >
              Office: MTIT-Maguindanao
            </span>
            <span
              style={{
                backgroundColor: "#CCFFCC",
                padding: "10px 30px 10px 30px",
              }}
            >
              SR NO.
            </span>
            <span
              style={{
                backgroundColor: "#3B4E87",
                color: "white",
                padding: "10px 30px 10px 30px",
              }}
            >
              Date: {moment().format("YYYY-MM-DD")}
            </span>
          </section>
          <section>Division: </section>

          <section>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="assessment-header"
                      align="center"
                      sx={{ backgroundColor: "#CCFFCC", color: "#008000" }}
                    >
                      UNIT
                    </TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                      sx={{ backgroundColor: "#CCFFCC", color: "#008000" }}
                    >
                      ITEM DESCRIPTION
                    </TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                      sx={{ backgroundColor: "#CCFFCC", color: "#008000" }}
                    >
                      QUANTITY
                    </TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                      sx={{ backgroundColor: "#CCFFCC", color: "#008000" }}
                    >
                      UNIT PRICE
                    </TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                      sx={{ backgroundColor: "#CCFFCC", color: "#008000" }}
                    >
                      TOTAL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="assessment-tablebody">
                  {items?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.price}</TableCell>
                      <TableCell align="center">
                        {item.price * item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell
                      sx={{
                        textAlign: "right",
                        width: "100%",
                      }}
                      colSpan={2}
                    >
                      TOTAL: {total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </div>
      </div>

      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default SupplyRequest;
