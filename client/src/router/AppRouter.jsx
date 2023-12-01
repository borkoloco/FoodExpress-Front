import { Route, Routes, useLocation } from "react-router-dom";

/*IMPORTACIÓN DE RUTAS */
import { RestaurantRoutes } from "../restaurant/routes/RestaurantRoutes";
import { AdminRoutes } from "../admin/routes/AdminRoutes";
import { useEffect, useState } from "react";
import { firebase } from "../utils/firebase";
import { login } from "../redux/actions/action";
import { useDispatch } from "react-redux";
import { Loading } from "../ui/components/Loading/Loading";

/*ROUTER PRINCIPAL DE LA APLICACIÓN */
export const AppRouter = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.email));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, checking, isLoggedIn]);

  if (checking) {
    return <Loading/>;
  }

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
