
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Shop from "./pages/shop/Shop";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  var currentUser = useSelector ((state) => state.user.currentUser);
  
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      currentUser = true;
      console.log("i ammm");
    }
  }, [])
  const [isOpenAddProductModal, setIsOpenAddProductModal] = useState(true);
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{
            flex: 6, overflow: "auto",
            maxHeight: "100vh"
          }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/:category",
          element: <Home />,
        },
        {
          path: "/shop/:id",
          element: <Shop />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;