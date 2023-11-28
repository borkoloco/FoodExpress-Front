import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import validations from "../../../utils/validations";
// import style from "./FormMenu.module.css";
import style from "../../components/FormAdmin/FormAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postProduct,
  getSpecialties,
  getTypesOfFood,
  updateMenu,
  getAllMenu,
} from "../../../redux/actions/action";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import Swal from "sweetalert2";

const FormMenuEdit = () => {
  const menuDetail = useSelector((state) => state.menuDetail);

  const imgDefault =
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1700339341/FoodExpressImg/FoodLogo_nsnkjw.png";
  const [menuData, setMenuData] = useState({
    idMenu: null,
    nameMenu: null,
    description: null,
    imageUrl: null,
    price: null,
    available: null,
    tipeMenu: null,
    specialtyMenu: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const allSpecialties = useSelector((state) => state.allSpecialties);
  const allTypesOfFood = useSelector((state) => state.allTypesOfFood);
  //*cloudinary
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imgUrl, setImgUrl] = useState(menuDetail.imageUrl);
  const [force, setForce] = useState(true);

  useEffect(() => {
    if (allSpecialties.length === 0) {
      dispatch(getSpecialties());
    }
    if (allTypesOfFood.length === 0) {
      dispatch(getTypesOfFood());
    }
  }, []);

  useEffect(() => {
    // Verifica si menuDetail tiene datos y actualiza menuData con esos datos
    if (menuDetail.idMenu) {
      setImgUrl(menuDetail.imageUrl);
      setMenuData({
        idMenu: menuDetail.idMenu,
        nameMenu: menuDetail.nameMenu || "",
        description: menuDetail.description || "",
        imageUrl: menuDetail.imageUrl || imgDefault,
        price: menuDetail.price || 0,
        available: menuDetail.available || false,
        tipeMenu: menuDetail.typeMenu || "",
        specialtyMenu: menuDetail.specialtyMenu || "",
      });
    }
  }, [menuDetail]);

  //manejadores de eventos onChange
  const handleChange = (event) => {
    const propiedad = event.target.name;
    const value = event.target.value;
    setMenuData({ ...menuData, [propiedad]: value });
    setErrors(validations({ ...menuData, [propiedad]: value }));
  };
  const handleChangeAvailable = (chequed) => {
    setMenuData({ ...menuData, available: chequed });
    checkError();
  };
  const handleTipoPlatoChange = (e) => {
    setMenuData({ ...menuData, tipeMenu: e.target.value });
    checkError();
  };

  const handleEspecialidadChange = (e) => {
    setMenuData({ ...menuData, specialtyMenu: e.target.value });
    checkError();
  };

  const checkError = () => {
    const hasErrors = Object.values(errors).some((error) => !!error);
    setIsSubmitButtonDisabled(hasErrors);
    setForce(!force);
  };

  // Verificar si hay errores para botón Submit
  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => !!error);
    setIsSubmitButtonDisabled(hasErrors);
  }, [errors]);

  useEffect(() => {
    if (imgUrl) {
      setMenuData((prevMenuData) => ({ ...prevMenuData, imageUrl: imgUrl }));
    }
  }, [imgUrl]);

  //*cloudinary
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "foodexpressimg",
        uploadPreset: "tspeblqq",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          // Captura la URL y almacénala en el estado
          setImgUrl(result.info.url);
        }
      }
    );
  }, []);

  const handleUploadButtonClick = (event) => {
    event.preventDefault();
    widgetRef.current.open();
  };
  //!logica para el envio del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const sendData = {
      nameMenu: menuData.nameMenu,
      description: menuData.description,
      imageUrl: imgUrl,
      price: menuData.price,
      //available: menuData.available,
      tipo: menuData.tipeMenu,
      especialidad: menuData.specialtyMenu,
    };
    await dispatch(updateMenu(menuData.idMenu, sendData));
    await dispatch(getAllMenu());
  };

  return (
    <>
      {/* <BackButton /> */}
      <div className={style.container_form}>
        {/* <h2>Edita el plato seleccionado</h2> */}
        <div className="mb-3">
          <label className="form-label" htmlFor="nameMenu">
            Plato:{" "}
          </label>
          <input
            className="form-control"
            type="text"
            name="nameMenu"
            id="nameMenu"
            placeholder="Nombre del plato"
            value={menuData.nameMenu}
            onChange={handleChange}
          />
          <span className="form-text text-danger">{errors.nameMenu}</span>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Descripción:{" "}
          </label>
          <textarea
            className="form-control"
            rows="3"
            type="text"
            name="description"
            id="description"
            placeholder="Descripción del plato"
            value={menuData.description}
            onChange={handleChange}
          />
          <span className="form-text text-danger">{errors.description}</span>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="price">
            Precio:{" "}
          </label>
          <input
            className="form-control"
            type="number"
            name="price"
            id="price"
            placeholder="Precio del plato"
            value={menuData.price}
            onChange={handleChange}
          />
          <span className="form-text text-danger">{errors.price}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Disponible:{"  "}
            <Switch
              onChange={handleChangeAvailable}
              checked={menuData.available}
            />
          </label>
        </div>
        {/options/}
        <div>
          <div className="mb-3">
            <label className="form-label">Tipos de Platos:</label>{" "}
            {/* <button onClick={handleAddTipoComida}>Agregar</button> */}
            <select
              className="form-select"
              value={menuData.tipeMenu}
              onChange={handleTipoPlatoChange}
            >
              {allTypesOfFood.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Especialidades:</label>{" "}
            {/* <button onClick={handleAddSpecial}>Agregar</button> */}
            <select
              className="form-select"
              value={menuData.specialtyMenu}
              onChange={handleEspecialidadChange}
            >
              {allSpecialties.map((specialty) => (
                <option key={specialty.id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <button className="btn btn-success" onClick={handleUploadButtonClick}>
            Upload
          </button>
          {menuData.imageUrl && (
            <img
              src={menuData.imageUrl}
              alt="Uploaded"
              style={{ marginLeft: "10px", maxWidth: "150px" }}
            />
          )}
        </div>
        <div className="mb-3">
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitButtonDisabled}
          >
            Actualizar
          </button>
        </div>
      </div>
    </>
  );
};

export default FormMenuEdit;