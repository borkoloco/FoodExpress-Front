import { Link, NavLink } from "react-router-dom";
import style from "./SideBar.module.css";
export const SideBar = () => {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <span className="brand-name fs-4">Dashboard</span>
      </div>
      <hr className="text-dark" />
      <div className={`${style.list_group} list-group-flush`}>
        <NavLink to="/dashboard/home" className="list-group-item py-2">
          <span>Home</span>
        </NavLink>
        <NavLink to="/dashboard/products" className="list-group-item py-2 ">
          <span>Products</span>
        </NavLink>
        <NavLink className="list-group-item py-2">
          <span>Bookings</span>
        </NavLink>
        <NavLink className="list-group-item py-2">
          <span>Customers</span>
        </NavLink>
        <NavLink className="list-group-item py-2">
          <span>Payments</span>
        </NavLink>
        <NavLink
          to="/dashboard/reviewsaprobation"
          className="list-group-item py-2"
        >
          <span>Moderation</span>
        </NavLink>
        <NavLink className="list-group-item py-2">
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};
