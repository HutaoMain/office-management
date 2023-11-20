import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { OrderInterface, ProductInterface } from "../../Types";

interface Props {
  id: string;
}

const PurchaseRequest = ({ id }: Props) => {
  const [orderData, setOrderData] = useState<OrderInterface>();
  const [arrayOfObjects, setArrayOfObjects] = useState<ProductInterface[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/order/list/${id}`
      );
      setOrderData(res.data);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    setArrayOfObjects(eval(orderData?.orderJsonList || ""));
  }, [orderData?.orderJsonList]);

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const calculatedTotalPrice = arrayOfObjects?.reduce(
      (total, item) => total + item.price,
      0
    );

    setTotalPrice(calculatedTotalPrice);
  }, [arrayOfObjects]);

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
            <h1>Purchase Request</h1>
            <span>Bangsamoro Autonomous Region in Muslim Mindanao</span>
            <span>Ministry of trade, Investment and Tourism</span>
            <span style={{ fontWeight: "bold" }}>
              Maguindanao Provincial Office
            </span>
            <span>
              3rd Floor New Sardonyx Building Sinsuat Avenue, Cor.Gov.Gutierrez
              St. RH 7, Cotabato City
            </span>
            <span>Tel. No (064) 557-2474</span>
          </section>
          <section>
            <TableContainer sx={{ paddingTop: "10px" }}>
              <Table>
                <TableHead sx={{ border: "1px solid black" }}>
                  <TableRow>
                    <TableCell className="assessment-header" align="center">
                      Department/Bureau:
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      MTIT-MAG
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      PR-No.:
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      Date:
                    </TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                    ></TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                    ></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="assessment-header" align="center">
                      Section:
                    </TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                    ></TableCell>
                    <TableCell className="assessment-header" align="center">
                      SAI NO.:
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      Date:
                    </TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                    ></TableCell>
                    <TableCell
                      className="assessment-header"
                      align="center"
                    ></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="assessment-header" align="center">
                      STOCK NO.
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      UNIT
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      ITEM DESCRIPTION
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      QUANTITY
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      UNIT COST
                    </TableCell>
                    <TableCell className="assessment-header" align="center">
                      TOTAL COST
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  className="assessment-tablebody"
                  sx={{ border: "1px solid black" }}
                >
                  {arrayOfObjects?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.barCode}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.price}</TableCell>
                      <TableCell align="center">
                        {item.price * item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>

          <section
            style={{
              width: "100%",
              height: "200px",
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",

                justifyContent: "space-between",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <span>Funds Availability & Charging</span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>BAI ALAYNNA M. SANDATU</span>
                <span>Designated Cashier/TIDS</span>
              </div>
            </div>
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              TOTAL: {totalPrice}
            </div>
          </section>

          <section
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: "1px solid black",
              height: "80px",
            }}
          >
            <div style={{ padding: "10px" }}>
              <span>Purpose: </span>
            </div>

            <div
              style={{ width: "100%", textAlign: "center", padding: "10px" }}
            >
              <span>For regular consumption</span>
            </div>
          </section>

          <section
            style={{
              display: "flex",
              width: "100%",
              height: "150px",
              alignItems: "center",
              justifyContent: "space-evenl",
              border: "1px solid black",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                width: "20%",
                height: "100%",
                paddingLeft: "20px",
              }}
            >
              <span>Signature over printed name</span>
            </div>

            <div
              style={{
                border: "1px solid black",
                width: "40%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span style={{ padding: "10px" }}>Requested by:</span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  BAI AMIRA K. TUMINDIG
                </span>
                <span>Asst. Admin III</span>
              </div>
            </div>

            <div
              style={{
                border: "1px solid black",
                width: "40%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span style={{ padding: "10px" }}>Approved by:</span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>ROMEO N. DIOCOLANO</span>
                <span>Provincial Director</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};
export default PurchaseRequest;
