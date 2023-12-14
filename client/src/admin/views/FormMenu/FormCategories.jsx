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
          errors[property] = "The name cannot be empty";
        } else if (value.trim() === "") {
          errors[property] = "Don't use just space string";
        } else if (value.length < 2 || value.length > 30) {
          errors[property] = "Category must be between 2 and 30 characters";
        } else if (!regexName.test(value)) {
          errors[property] = "Category must contain only letters and spaces";
        } else if (
          allTypesOfFood.some(
            (type) =>
              type.name === value && !editingCategories.includes(type.id)
          )
        ) {
          errors[property] = "Category already declared";
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
      alert("It looks like you didn't enter a category.");
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteType(id));
    await dispatch(getTypesOfFood());
  };

  return (
    <div>
      <h3 className="fs-5" style={{ textAlign: "center", margin: "0" }}>
        Types of food
      </h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
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
            <td>New</td>
            <td>
              <input
                type="text"
                id="newCategory"
                name="newCategory"
                value={newCateg}
                onChange={(e) =>
                  handleChange(e.target.id, e.target.name, e.target.value)
                }
                placeholder="Enter a name"
              />
            </td>
            <td>
              <button
                onClick={() => handleGuardar(null, newCateg)}
                disabled={!!errors.newCategory || newCateg.trim() === ""}
              >
                Add
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
