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
import { Filters } from "../../../ui/components/Filters/Filters";

export const ProductsAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.allMenu);
  const [viewInactive, setViewInactive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orden, setOrden] = useState(true);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [filteredInactiveMenu, setFilteredInactiveMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllMenu());
        setFilteredMenu(allMenu.filter((menu) => menu.available));
        setFilteredInactiveMenu(allMenu.filter((menu) => !menu.available));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredMenu(allMenu.filter((menu) => menu.available));
    setFilteredInactiveMenu(allMenu.filter((menu) => !menu.available));
  }, [allMenu]);

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

  const handleDelete = async (id) => {
    await dispatch(updateMenuAvailability(id, false));
    await dispatch(getAllMenu());
  };

  const handleRestore = async (id) => {
    await dispatch(updateMenuAvailability(id, true));
    await dispatch(getAllMenu());
  };

  const handleToggleView = () => {
    setViewInactive(!viewInactive);
  };

  const handleViewProduct = (idMenu) => {
    // dispatch(getMenuDetailById(idMenu));
    navigate(`/menu/detail/${idMenu}`);
  };

  const handleOrder = (propiedad) => {
    if (filteredMenu) {
      const filteredMenuOrder = filteredMenu.sort((objeto1, objeto2) => {
        const valorA = objeto1[propiedad].toUpperCase();
        const valorB = objeto2[propiedad].toUpperCase();
        const comparacion = valorA.localeCompare(valorB);
        return orden ? comparacion : -comparacion; // Cambia el orden si estado 'orden' es false
      });

      setFilteredMenu(filteredMenuOrder);
    }
    if (filteredInactiveMenu) {
      const filteredInactiveMenuOrder = filteredInactiveMenu.sort(
        (objeto1, objeto2) => {
          const valorA = objeto1[propiedad].toUpperCase();
          const valorB = objeto2[propiedad].toUpperCase();
          const comparacion = valorA.localeCompare(valorB);
          return orden ? comparacion : -comparacion; // Cambia el orden si estado 'orden' es false
        }
      );

      setFilteredInactiveMenu(filteredInactiveMenuOrder);
    }
    setOrden(!orden);
  };

  return (
    <>
      <div className={Style.buttonsBar}>
        <NavLink to="/dashboard/createproduct">
          <button className="btn btn-success">Add</button>
        </NavLink>
        <NavLink to="/dashboard/editcategories">
          <button className="btn btn-dark mx-3">Edit Categories</button>
        </NavLink>
        {/* Botón para alternar entre la vista activa e inactiva */}
        <button className="btn btn-light" onClick={handleToggleView}>
          {viewInactive ? "View actives " : "View inactives"}
        </button>
        <button
          className="btn btn-light mx-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Filters
        </button>
      </div>
      {/* Colapse */}
      <div className="collapse mt-2" id="collapseExample">
        <div className="card card-body">
          <Filters responsive={true} />
        </div>
      </div>

         {/* Tabla de productos */}

         {isLoading ? (
        <Loading />
      ) : (
        ((viewInactive && filteredInactiveMenu.length > 0) ||
          (!viewInactive && filteredMenu.length > 0)) && (
          <div className={Style.tableContainer}>
            <table className="table caption-top bg-white rounded mt-2">
              <caption className="text-black fs-4">Products</caption>
              <thead>
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">
                    <span
                      onClick={() => handleOrder("nameMenu")}
                      style={{ cursor: "pointer" }}
                    >
                      Product ↕️
                    </span>
                  </th>
                  <th scope="col">
                    <span
                      onClick={() => handleOrder("typeMenu")}
                      style={{ cursor: "pointer" }}
                    >
                      Category ↕️
                    </span>
                  </th>
                  <th scope="col">
                    <span>Price</span>
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {viewInactive
                  ? filteredInactiveMenu.map((plato) => (
                      <tr key={plato.idMenu}>
                        {/* <th scope="row">{plato.idMenu}</th> */}
                        <td scope="row">{plato.nameMenu}</td>
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
                          <button
                            className="btn btn-warning"
                            id={plato.idMenu}
                            onClick={(e) => {
                              handleViewProduct(e.target.id);
                            }}
                          >
                            View
                          </button>
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
                        <td scope="row">{plato.nameMenu}</td>
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
                          <button
                            className="btn btn-warning"
                            id={plato.idMenu}
                            onClick={(e) => {
                              handleViewProduct(e.target.id);
                            }}
                          >
                            View
                          </button>
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
        )
      )}
    </>
  );
};