import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMenuDetailById,
  getOrdenByUserByDate,
  getReviewsByUser,
} from "../../../redux/actions/action";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import style from "./Orders.module.css";
import { useNavigate } from "react-router-dom";
import { Loading2 } from "../../../ui/components/Loading2/Loading2";
import { transformarFecha } from "../../../utils/formatFecha";

export const Orders = () => {
  const datauser = JSON.parse(localStorage.getItem("sesion"));
  const orderByIdUser = useSelector((state) => state.orderByIdUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const dataFetch = async() => {
      await dispatch(getOrdenByUserByDate(datauser.idUser));
      setLoading(true);

    }
    dataFetch()
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
          <th colSpan="4">{transformarFecha(envio.numero_de_envio)}</th>
          <th colSpan="4">
            <button className={style.button} onClick={() => handleRepeat(envio.numero_de_envio)}>
              Repeat order
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
              <button className={style.button} onClick={() => handleRating(orden.idMenu)}>
                Add review
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

      {
        loading ? (<div className={`card ${style.containerTable}`}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">ID Menu</th>
            </tr>
          </thead>
          {renderOrders()}
        </table>
      </div>) : <Loading2/>
      }
      
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
