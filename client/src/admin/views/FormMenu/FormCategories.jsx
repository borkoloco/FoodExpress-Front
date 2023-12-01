import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteType,
  getTypesOfFood,
  postTypesOfFood,
  updateType,
} from "../../../redux/actions/action";

//este componente apunta a los TIPOS DE PLATOS
function FormCategories() {
  const regexName = /^[A-Za-z\s]+$/;
  const dispatch = useDispatch();
  const allTypesOfFood = useSelector((state) => state.allTypesOfFood);
  const [newCateg, setNewCateg] = useState("");
  const [errors, setErrors] = useState({});
  const [nameCat, setNameCat] = useState({});
  const [editingCategories, setEditingCategories] = useState([]);
  const [force, setForce] = useState(true);

  const validationsCategories = (data) => {
    const errors = {};

    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        const value = data[property];

        if (value === "") {
          errors[property] = "El nombre no puede estar vacío";
        } else if (value.trim() === "") {
          errors[property] = "No uses sólo cadena de espacios";
        } else if (value.length < 2 || value.length > 30) {
          errors[property] = "La categoría debe tener entre 2 y 30 caracteres";
        } else if (!regexName.test(value)) {
          errors[property] =
            "La categoría debe contener solo letras y espacios";
        } else if (
          allTypesOfFood.some(
            (type) =>
              type.name === value && !editingCategories.includes(type.id)
          )
        ) {
          errors[property] = "Categoría ya declarada";
        }
      }
    }
    return errors;
  };

  useEffect(() => {
    if (allTypesOfFood.length === 0) {
      dispatch(getTypesOfFood());
    }
  }, []);

  useEffect(() => {
    setForce(!force);
  }, [allTypesOfFood]);

  const handleChange = (id, name, value) => {
    setNameCat((prevNameCat) => ({ ...prevNameCat, [name]: value }));

    if (name === "newCategory") {
      setNewCateg(value);
      setErrors(validationsCategories({ ...nameCat, [name]: value }));
    } else {
      setErrors(validationsCategories({ ...nameCat, [name]: value }));
    }
  };
  const handleEdit = (id, name) => {
    // Agrega el ID a la lista de categorías en modo de edición
    setEditingCategories((prevEditingCategories) => [
      ...prevEditingCategories,
      id,
    ]);
  };

  const handleCancelEdit = (id) => {
    // Remueve el ID de la lista de categorías en modo de edición
    setEditingCategories((prevEditingCategories) =>
      prevEditingCategories.filter((categoryId) => categoryId !== id)
    );
  };

  const handleSaveEdit = async (id, name) => {
    // Aquí puedes implementar la lógica para guardar la edición
    // Por ejemplo, puedes llamar a tu acción de Redux updateType
    // y luego remover la categoría de la lista de edición
    await dispatch(updateType(id, name));
    await dispatch(getTypesOfFood());
    // dispatch(getTypesOfFood());
    setForce(!force);
    // Remueve el ID de la lista de categorías en modo de edición
    setEditingCategories((prevEditingCategories) =>
      prevEditingCategories.filter((categoryId) => categoryId !== id)
    );
  };

  const handleGuardar = async (id, newCateg) => {
    if (newCateg) {
      await dispatch(postTypesOfFood(newCateg));
      await dispatch(getTypesOfFood());
      // dispatch(getTypesOfFood());
      // Limpiar el input y reiniciar el estado de errores
      setNewCateg("");
      setErrors({});
      setForce(!force);
    } else {
      alert("Parece que no ingresaste una categoría");
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteType(id));
    await dispatch(getTypesOfFood());
  };

  return (
    <div>
      <h3 className="fs-5">Tipos de comidas</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allTypesOfFood.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>
                {editingCategories.includes(type.id) ? (
                  <input
                    type="text"
                    name={type.name}
                    id={type.id}
                    value={
                      nameCat[type.name] !== undefined
                        ? nameCat[type.name]
                        : type.name
                    }
                    onChange={(e) =>
                      handleChange(type.id, type.name, e.target.value)
                    }
                  />
                ) : (
                  type.name
                )}
              </td>

              <td>
                {editingCategories.includes(type.id) ? (
                  <>
                    <button
                      disabled={!!errors[type.name]}
                      onClick={() =>
                        handleSaveEdit(type.id, nameCat[type.name])
                      }
                    >
                      🟢
                    </button>{" "}
                    <button onClick={() => handleCancelEdit(type.id)}>
                      🔴
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(type.id, type.name)}>
                    ✏️
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(type.id)}> ❌</button>
              </td>
              <td>
                <span> {errors[type.name]}</span>
              </td>
            </tr>
          ))}
          <tr>
            <td>Nuevo</td>
            <td>
              <input
                type="text"
                id="newCategory"
                name="newCategory"
                value={newCateg}
                onChange={(e) =>
                  handleChange(e.target.id, e.target.name, e.target.value)
                }
                placeholder="Ingresa un nombre"
              />
            </td>
            <td>
              <button
                onClick={() => handleGuardar(null, newCateg)}
                disabled={!!errors.newCategory || newCateg.trim() === ""}
              >
                Agregar
              </button>
            </td>
            <td> {errors.newCategory}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FormCategories;
