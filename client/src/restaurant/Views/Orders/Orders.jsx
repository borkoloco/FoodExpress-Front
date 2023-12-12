import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMenuDetailById,
  getOrdenByUserByDate,
  getReviewsByUser,
} from "../../../redux/actions/action";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import style from "./Orders.module.css";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const datauser = JSON.parse(localStorage.getItem("sesion"));
  const orderByIdUser = useSelector((state) => state.orderByIdUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrdenByUserByDate(datauser.idUser));
  }, []);

  // console.log("hola soy ", datauser.idUser);
  // console.log(orderByIdUser);

  const handleRating = async (idMenu) => {
    await dispatch(getReviewsByUser(datauser.idUser));
    await dispatch(getMenuDetailById(idMenu));
    navigate("/reviewuser");
  };

  const handleRepeat = (value) => {
    alert("Repetir pedido: " + value);
  };

  const renderOrders = () => {
    return orderByIdUser.map((envio, index) => (
      <tbody key={index}>
        <tr>
          <th colSpan="4">{envio.numero_de_envio}</th>
          <th colSpan="4">
            <button onClick={() => handleRepeat(envio.numero_de_envio)}>
              Repetir Pedido
            </button>
          </th>
        </tr>
        {envio.ordenes.map((orden) => (
          <tr key={orden.idOrden}>
            <th scope="row">
              {"("}
              {orden.idOrden}
              {")"}
            </th>
            <td>{orden.cantidad}</td>
            <td>${orden.precio}</td>
            <td>
              #{orden.idMenu}: {orden.nameMenu}
            </td>
            <td>
              <button onClick={() => handleRating(orden.idMenu)}>
                Califica
              </button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    ));
  };

  return (
    <>
      <div className={style.containerHeader}>
        <BackButton />
        <hr />
        <h2>My Orders</h2>
      </div>

      <div className={`card ${style.containerTable}`}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio</th>
              <th scope="col">ID Menu</th>
            </tr>
          </thead>
          {renderOrders()}
        </table>
      </div>
    </>
  );
};

// import { BackButton } from "../../../ui/components/BackButton/BackButton";
// import { useDispatch, useSelector } from "react-redux";
// import style from "./Orders.module.css";
// import { getOrdenByUserByDate } from "../../../redux/actions/action";
// import { useEffect } from "react";

// export const Orders = () => {
//   const datauser = JSON.parse(localStorage.getItem("sesion"));
//   const orderByIdUser = useSelector((state) => state.orderByIdUser);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getOrdenByUserByDate(datauser.idUser));
//   }, []);

//   console.log("hola soy ", datauser.idUser);
//   console.log(orderByIdUser);
//   return (
//     <>
//       <div className={style.containerHeader}>
//         <BackButton />
//         <hr />
//         <h2>My Orders</h2>
//       </div>

//       <div className={`card ${style.containerTable}`}>
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">First</th>
//               <th scope="col">Last</th>
//               <th scope="col">Handle</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">1</th>
//               <td>Mark</td>
//               <td>Otto</td>
//               <td>@mdo</td>
//             </tr>
//             <tr>
//               <th scope="row">2</th>
//               <td>Jacob</td>
//               <td>Thornton</td>
//               <td>@fat</td>
//             </tr>
//             <tr>
//               <th scope="row">3</th>
//               <td colSpan="2">Larry the Bird</td>
//               <td>@twitter</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };
