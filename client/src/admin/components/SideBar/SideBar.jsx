import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./SideBar.module.css";
import { getAllReviews, logoutByUser, startGoogleLogout } from "../../../redux/actions/action";

export const SideBar = () => {
  const dispatch = useDispatch();
  const allreviews = useSelector((state) => state.allreviews);
  const [pendingReviews, setPendingReviews] = useState([]);

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  useEffect(() => {
    // Filtra los comentarios con estado "Pendiente"
    const filteredReviews = allreviews.filter(
      (review) => review.idStatus === 1
    );
    setPendingReviews(filteredReviews);
  }, [allreviews]);

  const handleLogout = () => {
    dispatch(logoutByUser()); //limpia el estado global userLogued y userAuth
    dispatch(startGoogleLogout()); //limpia el uid, displaName y displayEmail por si acaso
    navigate("/login");
  };

  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <span className="brand-name fs-4">Dashboard</span>
      </div>
      <hr className="text-dark" />
      <div className={`${style.list_group} list-group-flush`}>
        <NavLink to="/dashboard/home" className="list-group-item py-2">
          Home
        </NavLink>
        <NavLink to="/dashboard/products" className="list-group-item py-2 ">
          Products
        </NavLink>
        <NavLink to="/dashboard/orders" className="list-group-item py-2 ">
          Orders
        </NavLink>
        {/* <NavLink className="list-group-item py-2">
          Bookings
        </NavLink> */}

        <NavLink to="/dashboard/usersAdmin" className="list-group-item py-2">
          Customers
        </NavLink>
        {/* <NavLink className="list-group-item py-2">Payments</NavLink> */}

        <NavLink
          to="/dashboard/reviewsaprobation"
          className="list-group-item py-2"
        >
          <span>Moderation</span>
          {pendingReviews.length !== 0 && <span>🔴</span>}
        </NavLink>

        <NavLink className="list-group-item py-2">
          <span onClick={handleLogout} type="button">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};
