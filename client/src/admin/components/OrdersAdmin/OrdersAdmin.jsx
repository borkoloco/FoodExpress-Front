import { useEffect, useState } from "react";
import { Loading } from "../../../ui/components/Loading/Loading";
import { getAllUsers, getOrders } from "../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { organizeOrders } from "../../../utils/organizeOrders";
import { transformarFecha } from "../../../utils/formatFecha";
import { FaEye, FaTrash } from "react-icons/fa";
import Style from "./OrdersAdmin.module.css";
import { NavLink } from "react-router-dom";

export const OrdersAdmin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const allOrders = useSelector((state) => state.allOrders);
  const allusersShow = useSelector((state) => state.allusersShow);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getOrders());
        await dispatch(getAllUsers());
        setIsLoading(false);
        console.log(allusersShow);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={Style.tableContainer}>
          <table className="table caption-top bg-white rounded">
            <caption className="text-black fs-4">Orders</caption>
            <thead>
              <tr>
                <th scope="col">Id ↕️</th>
                <th scope="col">Customer ↕️</th>
                <th scope="col">Amount</th>
                <th scope="col">Day</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizeOrders(allOrders).map((order,index) => (
                <tr key={index}>
                  <th scope="row">{order.idOrden}</th>
                  <td>{findUserNameById(allusersShow,order.idUser)}</td>
                  <td>{order.subtotal}</td>
                  <td>{transformarFecha(order.fecha_de_compra)}</td>
                  <td>{order.estado}</td>
                  <td>
                    
                    <NavLink to={`/dashboard/order/detail/${order.idOrden}`}>
                      <button className="btn btn-warning" type="button"><FaEye color="white"/></button>
                    </NavLink>

                    <button className="btn btn-danger" type="button"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const findUserNameById = (users, idToFind) => {
  const foundUser = users.find(user => user.idUser === idToFind);
  return foundUser ? foundUser.nameUser : "null";
};



