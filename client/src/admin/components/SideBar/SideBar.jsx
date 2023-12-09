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
          Home
        </NavLink>
        <NavLink to="/dashboard/products" className="list-group-item py-2 ">
          Products
        </NavLink>
        {/* <NavLink className="list-group-item py-2">
          Bookings
        </NavLink> */}
        <NavLink className="list-group-item py-2">
          Customers
        </NavLink>
        <NavLink className="list-group-item py-2">
          Payments
        </NavLink>
        <NavLink
          to="/dashboard/reviewsaprobation"
          className="list-group-item py-2"
        >
          Moderation
        </NavLink>
        <NavLink className="list-group-item py-2">
          Logout
        </NavLink>
      </div>
    </div>
  );
};
