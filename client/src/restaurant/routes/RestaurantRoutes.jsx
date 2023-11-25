import { Navigate, Route, Routes } from "react-router-dom"
import { NavBar } from "../../ui/components/NavBar/NavBar"
import Landing from "../Views/Landing/Landing"
import Home from "../Views/Home/Home"
import DetailMenu from "../Views/DetailMenu/DetailMenu"
import FormMenu from "../../admin/views/FormMenu/FormMenu"
import ShoppingCart  from "../Views/ShoppingCart/ShoppingCart"
import Login from "../../auth/views/Login/Login"
import Register from "../../auth/views/Register/Register"


export const RestaurantRoutes = () => {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu/detail/:id" element={<DetailMenu />} />
        <Route path="/form" element={<FormMenu/>} />
        <Route path="/cart" element={<ShoppingCart/>} />
        
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/*Añade más rutas aqui...  */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      </>
  )
}
