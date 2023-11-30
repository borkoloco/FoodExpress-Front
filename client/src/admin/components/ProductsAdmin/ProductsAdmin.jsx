import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../ui/components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import {
  getAllMenu,
  updateMenuAvailability,
  getMenuDetailById,
} from "../../../redux/actions/action";
import FormAdmin from "../FormAdmin/FormAdmin";
import FormABMcategory from "../../views/FormMenu/FormABMcategory";
import Style from "./ProductsAdmin.module.css";

export const ProductsAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.allMenu);
  const [viewInactive, setViewInactive] = useState(false);

  useEffect(() => {
    if (allMenu.length === 0) {
      dispatch(getAllMenu());
    }
  }, []);

  const handleEditProduct = (id) => {
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
      {/* Modal es un Botón que abre un modal con el form de producto */}
      <Modal
        name="Add"
        component={<FormAdmin />}
        title="Crea tu nuevo plato"
        style="btn-success"
      />
      <Modal
        name="EditCategories"
        component={<FormABMcategory />}
        title="Modifica tus categorías"
        style="btn-dark"
      />

      {/* Botón para alternar entre la vista activa e inactiva */}
      <button className="btn btn-info" onClick={handleToggleView}>
        {viewInactive ? "Mostrar Activos" : "Mostrar Inactivos"}
      </button>

      {/* Tabla de productos */}
      {((viewInactive && filteredInactiveMenu.length > 0) ||
        (!viewInactive && filteredMenu.length > 0)) && (
        <table className="table caption-top bg-white rounded mt-2">
          <caption className="text-black fs-4">Products</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
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
                    <th scope="row">{plato.idMenu}</th>
                    <td>{plato.nameMenu}</td>
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
                    <th scope="row">{plato.idMenu}</th>
                    <td>{plato.nameMenu}</td>
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
      )}
    </>
  );
};
