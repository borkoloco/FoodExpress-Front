import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SideBar } from "../components/SideBar/SideBar";
import { HomeAdmin } from "../components/HomeAdmin/HomeAdmin";
import { ProductsAdmin } from "../components/ProductsAdmin/ProductsAdmin";
import { NavBarAdmin } from "../components/NavBarAdmin/NavBarAdmin";
import style from "./Dashboard.module.css";
import FormMenuEdit from "../views/FormMenu/FormMenuEdit";
import FormAdmin from "../components/FormAdmin/FormAdmin";
import FormABMcategory from "../views/FormMenu/FormABMcategory";
import { Form } from "../../ui/components/Form/Form";
import ReviewsAprobation from "../components/ReviewAdmin/ReviewsAprobation";
import { OrdersAdmin } from "../../admin/components/OrdersAdmin/OrdersAdmin";
import { DetailOrder } from "../components/DetailOrder/DetailOrder";

export const AdminRoutes = () => {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };


  const datauser = JSON.parse(localStorage.getItem('sesion'));
  // console.log("soy data user", datauser)
  if (!datauser) {
    return <Navigate to="/" />;
  }
  const isAdmin = datauser.idRole === 2;


  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`container-fluid min-vh-100 ${style.bg_color}`}>
      <div className="row ">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <SideBar />
          </div>
        )}
        {toggle && <div className="col-4 col-md-2"></div>}

        <div className="col">
          <div className="px-3">
            <NavBarAdmin Toggle={Toggle} />
            <Routes>
              <Route path="home" element={<HomeAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="order/detail/:idOrder" element={<DetailOrder />} />
              <Route
                path="createproduct"
                element={<Form children={<FormAdmin />} />}
              />
              <Route
                path="editcategories"
                element={<Form children={<FormABMcategory />} />}
              />
              <Route
                path="editproduct"
                element={<Form children={<FormMenuEdit />} />}
              />
              <Route
                path="reviewsaprobation"
                element={<Form children={<ReviewsAprobation />} />}
              />
              {/*Añade más rutas aqui...  */}
              <Route path="/*" element={<Navigate to="/dashboard/home" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
