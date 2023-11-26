import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../ui/components/Modal/Modal";
import { getAllMenu } from "../../../redux/actions/action";
import FormAdmin from "../FormAdmin/FormAdmin";
import FormABMcategory from "../../views/FormMenu/FormABMcategory";
import Style from './ProductsAdmin.module.css'

export const ProductsAdmin = () => {
  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.allMenu);

  useEffect(() => {
    if (allMenu.length === 0) {
      dispatch(getAllMenu());
    }
  }, []);

  return (
    <>
      {/* Modal es un Botón que abre un modal con el form de producto */}
      <Modal name='Add' component={<FormAdmin />} title="Crea tu nuevo plato" style='btn-success' />
      <Modal name='EditCategories' component={<FormABMcategory />} title='Modifica tus categorías' style='btn-dark'/>
      {/* Tabla de productos */}
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
          {allMenu && allMenu.length > 0 ? (
            allMenu.map((plato) => (
              <tr>
                <th scope="row">{plato.idMenu}</th>
                <td>{plato.nameMenu}</td>
                <td>{plato.typeMenu}</td>
                <td>{plato.price}</td>
                <td>{plato.available ? 'Activated' :'Disabled'}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-warning">View</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <img
              className={Style.imgLoading}
              src="https://media.tenor.com/SWJCs0u0Tr0AAAAC/taco-tacos.gif"
              alt="Loading"
            />
          )}
        </tbody>
      </table>
    </>
  );
};
