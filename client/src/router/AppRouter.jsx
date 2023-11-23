import { Route, Routes, useLocation } from "react-router-dom";

/*IMPORTACIÓN DE RUTAS */
import { RestaurantRoutes } from "../restaurant/routes/RestaurantRoutes";
import { AdminRoutes } from "../admin/routes/AdminRoutes";

/*ROUTER PRINCIPAL DE LA APLICACIÓN */
export const AppRouter = () => {
  const location = useLocation();
  return (
    <>
     
      <Routes>
        
        <Route path="/*" element={<RestaurantRoutes />} />

        <Route path="/dashboard/*" element={<AdminRoutes />} />

        {/* Más rutas generales aquí...  */}

      </Routes>
    </>
  );
};
