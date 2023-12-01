import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "../../ui/components/NavBar/NavBar";
import Landing from "../Views/Landing/Landing";
import Home from "../Views/Home/Home";
import DetailMenu from "../Views/DetailMenu/DetailMenu";
import ShoppingCart from "../Views/ShoppingCart/ShoppingCart";
import Login from "../../auth/views/Login/Login";
import Register from "../../auth/views/Register/Register";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { firebase } from "../../utils/firebase";
import { login } from "../../redux/actions/action";
import FormCategories from "../../admin/views/FormMenu/FormCategories";
import FormABMcategory from "../../admin/views/FormMenu/FormABMcategory";
import { Footer } from "../../ui/components/Footer/Footer";
import { Comments } from "../components/Comments/Comments";

export const RestaurantRoutes = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user?.uid) {
  //       dispatch(login(user.uid, user.displayName));
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //     setChecking(false);
  //   });
  // }, [dispatch, checking, isLoggedIn]);

  // if (checking) {
  //   return <h3>Cargando...</h3>;
  // }

  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu/detail/:id" element={<DetailMenu />} />
        {/* <Route path="/form" element={<FormMenu/>} /> */}
        <Route path="/form/category" element={<FormABMcategory />} />
        <Route path="/cart" element={<ShoppingCart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/comments" element={<Comments />} />

        {/*Añade más rutas aqui...  */}
        {/* <Route path="/*" element={<Navigate to="/" />} /> */}
      </Routes>
      <Footer/>
    </>
  );
};
