import { Route, Routes } from "react-router-dom";
import Home from "../Views/Home/Home";
import FormMenu from "../Views/FormMenu/FormMenu";

/*ROUTER PRINCIPAL DE LA APLICACIÓN */
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/form" element={<FormMenu />} />
      {/* <Route path="/menu" element={<MenuPage />} /> */}
      {/*Añade más rutas aqui...  */}
    </Routes>
  );
};
