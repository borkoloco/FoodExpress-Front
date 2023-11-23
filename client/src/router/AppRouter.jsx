import { Route, Routes } from "react-router-dom";

/*IMPORTACIÓN DE RUTAS */
import Home from "../restaurant/Views/Home/Home";
import Landing  from "../restaurant/Views/Landing/Landing";
import DetailMenu from "../restaurant/Views/DetailMenu/DetailMenu";
import FormMenu from "../admin/views/FormMenu/FormMenu";
import Dashboard  from "../admin/views/Dashboard/Dashboard";

/*ROUTER PRINCIPAL DE LA APLICACIÓN */
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu/detail/:id" element={<DetailMenu />} />

      <Route path="/form" element={<FormMenu />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/*Añade más rutas aqui...  */}
    </Routes>
  );
};
