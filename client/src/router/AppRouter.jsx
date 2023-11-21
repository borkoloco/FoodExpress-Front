import { Route, Routes } from "react-router-dom";

/*IMPORTACIÓN DE RUTAS */
import Home from "../Views/Home/Home";
import FormMenu from "../Views/FormMenu/FormMenu";
import  Landing  from "../Views/Landing/Landing";
import DetailMenu from "../Views/DetailMenu/DetailMenu";

/*ROUTER PRINCIPAL DE LA APLICACIÓN */
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/form" element={<FormMenu />} />
      <Route path="/menu/detail/:id" element={<DetailMenu />} />
      {/*Añade más rutas aqui...  */}
    </Routes>
  );
};
