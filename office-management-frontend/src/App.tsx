import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage/UserPage";
import Navbar from "./components/navbar/Navbar";
import useAuthStore from "./zustand/AuthStore";
import { ToastContainer } from "react-toastify";
import Product from "./pages/ProductPage/Product";
import Order from "./pages/OrderPage/Order";

function App() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="App">
      {user ? <Sidebar /> : <></>}
      <section className="App-container">
        {user ? <Navbar /> : <></>}
        <Routes>
          <Route
            path="login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path=""
            element={user ? <DashboardPage /> : <Navigate to="login" />}
          />
          <Route
            path="products"
            element={user ? <Product /> : <Navigate to="login" />}
          />
          <Route
            path="users"
            element={user ? <UserPage /> : <Navigate to="login" />}
          />
          <Route
            path="orders"
            element={user ? <Order /> : <Navigate to="login" />}
          />
          {/* <Route path="users" element={<UserPage />} /> */}
        </Routes>
      </section>
      <ToastContainer />
    </div>
  );
}

export default App;
