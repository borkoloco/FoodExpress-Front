import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SideBar } from "../components/SideBar/SideBar";
import { HomeAdmin } from "../components/HomeAdmin/HomeAdmin";
import { ProductsAdmin } from "../components/ProductsAdmin/ProductsAdmin";
import { NavBarAdmin } from "../components/NavBarAdmin/NavBarAdmin";
import style from "./Dashboard.module.css";
import FormMenuEdit from "../views/FormMenu/FormMenuEdit";

export const AdminRoutes = () => {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
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
              <Route path="editproduct" element={<FormMenuEdit />} />
              {/*Añade más rutas aqui...  */}
              <Route path="/*" element={<Navigate to="/dashboard/home" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
