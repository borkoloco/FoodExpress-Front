import { Route, Routes } from "react-router-dom";
import Home from "../Views/Home/Home";
import FormMenu from "../Views/FormMenu/FormMenu";
import { Landing } from "../Views/Landing/Landing";

/*ROUTER PRINCIPAL DE LA APLICACIÓN */
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/form" element={<FormMenu />} />
      {/*Añade más rutas aqui...  */}
    </Routes>
  );
};
