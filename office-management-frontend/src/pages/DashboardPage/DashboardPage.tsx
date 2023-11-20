// import OrderCount from "../../components/Charts/OrderCount";
import "./DashboardPage.css";
// import ProductCount from "../../components/Charts/ProductCount";
import BarChart from "../../components/Charts/BarChart";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      {/*    <div><hr style={{ borderBottom: "3px solid red" }} /> </div>*/}
      {/* <div className="boxes">
        <ProductCount />
        <OrderCount />
      </div> */}
      <div>
        <h1>Dashboard</h1>
        <hr style={{ borderBottom: "3px solid red" }} />
        <BarChart />
      </div>
    </div>
  );
};

export default DashboardPage;
