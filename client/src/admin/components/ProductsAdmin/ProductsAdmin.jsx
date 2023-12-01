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
import { Loading } from "../../../ui/components/Loading/Loading";
import { Sliding } from "../../../ui/components/Sliding/Sliding";

export const ProductsAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.allMenu);
  const [viewInactive, setViewInactive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allMenu.length === 0) {
      dispatch(getAllMenu())
        .then(() => {
          setIsLoading(false); // Una vez que se obtienen los datos, se desactiva el estado de carga
        })
        .catch((error) => {
          // Manejo de errores si la carga falla
          console.error("Error fetching data:", error);
          setIsLoading(false); // Asegurarse de desactivar el estado de carga en caso de error
        });
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
      {/* Sliding es un Botón que abre un panel que se despliega a la derecha con el form */}
      <Sliding
        btnName="Add"
        btnStyle="btn-success"
        component={<FormAdmin />}
        title="Create your product"
        offcanvasId="form-create-product"
      />
      <Sliding
        btnName="Edit Categories"
        btnStyle="btn-dark"
        component={<FormABMcategory />}
        title="Edit your categories"
        offcanvasId="form-categories"
      />   

      {/* Botón para alternar entre la vista activa e inactiva */}
      <button className="btn btn-info" onClick={handleToggleView}>
        {viewInactive ? "Mostrar Activos" : "Mostrar Inactivos"}
      </button>

      {/* Tabla de productos */}

      {isLoading ? (
        <Loading />
      ) : (
        ((viewInactive && filteredInactiveMenu.length > 0) ||
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
                          disabled
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
                          disabled
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
        )
      )}
      {}
    </>
  );
};
