import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Modal } from "../../../ui/components/Modal/Modal";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAllMenu,
  updateMenuAvailability,
  getMenuDetailById,
} from "../../../redux/actions/action";
import FormAdmin from "../FormAdmin/FormAdmin";
import FormABMcategory from "../../views/FormMenu/FormABMcategory";
import Style from "./ProductsAdmin.module.css";

import Swal from "sweetalert2";

import { Loading } from "../../../ui/components/Loading/Loading";
import FormMenuEdit from "../../views/FormMenu/FormMenuEdit";


export const ProductsAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.allMenu);
  const [viewInactive, setViewInactive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
      dispatch(getAllMenu())
        .then(() => {
          setIsLoading(false); // Una vez que se obtienen los datos, se desactiva el estado de carga
        })
        .catch((error) => {
          // Manejo de errores si la carga falla
          console.error("Error fetching data:", error);
          setIsLoading(false); // Asegurarse de desactivar el estado de carga en caso de error
        });
    
  }, []);

  const handleEditProduct = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Advertencia",
      text: "No realices cambios radicales en los productos que ya guardaste.",
      //footer: '<a href="#">Why do I have this issue?</a>',
    });

    dispatch(getMenuDetailById(id));
    navigate("/dashboard/editproduct");
  };


  const handleDelete = (id) => {
    dispatch(updateMenuAvailability(id, false));
  };

  const handleRestore = (id) => {
    dispatch(updateMenuAvailability(id, true));
  };

  const filteredMenu = allMenu.filter((menu) => menu.available);
  const filteredInactiveMenu = allMenu.filter((menu) => !menu.available);

  const handleToggleView = () => {
    setViewInactive(!viewInactive);
  };



  return (
    <>
      <div className={Style.buttonsBar}>
        <NavLink to="/dashboard/createproduct">
          <button className="btn btn-success" >
            Add
          </button>
        </NavLink>
        <NavLink to="/dashboard/editcategories">
          <button className="btn btn-dark mx-3" >
            Edit Categories
          </button>
        </NavLink>
        {/* Botón para alternar entre la vista activa e inactiva */}
        <button className="btn btn-info" onClick={handleToggleView}>
          {viewInactive ? "View actives " : "View inactives"}
        </button>
      </div>

      {/* Tabla de productos */}


      {isLoading ? (
        <Loading />
      ) : (((viewInactive && filteredInactiveMenu.length > 0) ||
      (!viewInactive && filteredMenu.length > 0)) && (
      <div className={Style.tableContainer}>
        <table className="table caption-top bg-white rounded mt-2">
          <caption className="text-black fs-4">Products</caption>
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {viewInactive
              ? filteredInactiveMenu.map((plato) => (
                  <tr key={plato.idMenu}>
                    {/* <th scope="row">{plato.idMenu}</th> */}
                    <td  scope="row">{plato.nameMenu}</td>
                    <td>{plato.typeMenu}</td>
                    <td>{plato.price}</td>
                    <td>{plato.available ? "Activated" : "Disabled"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        id={plato.idMenu}
                        onClick={(e) => {
                          handleEditProduct(e.target.id);
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-warning">View</button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleRestore(plato.idMenu)}
                      >
                        Restaurar
                      </button>
                    </td>
                  </tr>
                ))
              : filteredMenu.map((plato) => (
                  <tr key={plato.idMenu}>
                    {/* <th scope="row">{plato.idMenu}</th> */}
                    <td  scope="row">{plato.nameMenu}</td>
                    <td>{plato.typeMenu}</td>
                    <td>{plato.price}</td>
                    <td>{plato.available ? "Activated" : "Disabled"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        id={plato.idMenu}
                        onClick={(e) => {
                          handleEditProduct(e.target.id);
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-warning">View</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(plato.idMenu)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    ))}
    </>
  );
};
