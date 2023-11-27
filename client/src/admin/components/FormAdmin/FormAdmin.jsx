import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import validations from "../../../utils/validations";
import style from "./FormAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postProduct,
  getSpecialties,
  getTypesOfFood,
  postSpecialties,
  postTypesOfFood,
} from "../../../redux/actions/action";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import Swal from "sweetalert2";

const FormAdmin = () => {
  const imgDefault =
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1700339341/FoodExpressImg/FoodLogo_nsnkjw.png";
  const [menuData, setMenuData] = useState({
    //idMenu sería Integer y autoIncrement
    nameMenu: "", //string de unos 30 caracteres
    description: "", //string de 255 caracteres estimo
    imageUrl: imgDefault, //string de 255 caracteres
    price: 0, //Decimal de 2 posiciones flotantes
    available: true, //booleano disponible o no disponoble
    tipeMenu: "",
    specialtyMenu: "",
  });

  const [errors, setErrors] = useState({ initial: "initial" });
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const allSpecialties = useSelector((state) => state.allSpecialties);
  const allTypesOfFood = useSelector((state) => state.allTypesOfFood);
  //*cloudinary
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imgUrl, setImgUrl] = useState("");
  const [force, setForce] = useState(true);

  //!modal
  const regexName = /^[A-Za-z\s]+$/;
  const handleAddSpecial = async () => {
    const inputValue = window.prompt("Ingresa una especialidad:");
    if (!(inputValue === null || inputValue === "")) {
      // El usuario hizo clic en "Aceptar" y proporcionó un valor
      if (validationsCategories(inputValue)) {
        await dispatch(postSpecialties(inputValue));
        await dispatch(getSpecialties());
        setForce(!force);
      }
    }
  };

  const handleAddTipoComida = async () => {
    const inputValue = window.prompt("Ingresa un tipo de comida:");
    if (!(inputValue === null || inputValue === "")) {
      // El usuario hizo clic en "Aceptar" y proporcionó un valor
      if (validationsCategories(inputValue)) {
        await dispatch(postTypesOfFood(inputValue));
        await dispatch(getTypesOfFood());
        console.log(allTypesOfFood);
        setForce(!force);
      }
    }
  };

  const validationsCategories = (value) => {
    if (value === "") {
      window.alert("Debes ingresar una categoria");
      return false;
    } else if (value.trim() === "") {
      window.alert("No uses cadenas de espacios");
      return false;
    } else if (value.length < 2 || value.length > 30) {
      window.alert("Usa entre 2 y 30 caracteres");
      return false;
    } else if (!regexName.test(value)) {
      window.alert("Usa solo letras y espacios");
      return false;
    }
    return true;
  };

  //!fin modal

  useEffect(() => {
    if (allSpecialties.length === 0) {
      dispatch(getSpecialties());
    }
    if (allTypesOfFood.length === 0) {
      dispatch(getTypesOfFood());
    }
  }, []);

  useEffect(() => {
    if (allSpecialties.length !== 0) {
      setMenuData((prevMenuData) => ({
        ...prevMenuData,
        specialtyMenu: allSpecialties[0].name,
      }));
    }
  }, [allSpecialties]);

  useEffect(() => {
    if (allTypesOfFood.length !== 0) {
      setMenuData((prevMenuData) => ({
        ...prevMenuData,
        tipeMenu: allTypesOfFood[0].name,
      }));
    }
  }, [allTypesOfFood]);

  //manejadores de eventos onChange
  const handleChange = (event) => {
    const propiedad = event.target.name;
    const value = event.target.value;
    setMenuData({ ...menuData, [propiedad]: value });
    setErrors(validations({ ...menuData, [propiedad]: value }));
  };
  const handleChangeAvailable = (chequed) => {
    setMenuData({ ...menuData, available: chequed });
  };
  const handleTipoPlatoChange = (e) => {
    setMenuData({ ...menuData, tipeMenu: e.target.value });
  };

  const handleEspecialidadChange = (e) => {
    setMenuData({ ...menuData, specialtyMenu: e.target.value });
  };

  // Verificar si hay errores para botón Submit
  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => !!error);
    setIsSubmitButtonDisabled(hasErrors);
  }, [errors]);

  //!logica para el envio del formulario
  useEffect(() => {
    if (imgUrl) {
      setMenuData((prevMenuData) => ({ ...prevMenuData, imageUrl: imgUrl }));
    }
  }, [imgUrl]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!imgUrl) {
      const result = window.confirm("Crear un plato sin imagen?");
      if (result) {
        //datos que se envian
        const sendData = {
          nameMenu: menuData.nameMenu,
          description: menuData.description,
          imageUrl: menuData.imageUrl,
          price: menuData.price,
          available: menuData.available,
          tipo: menuData.tipeMenu,
          especialidad: menuData.specialtyMenu,
        };
        dispatch(postProduct(sendData));
        //* limpiar formulario
        setMenuData({
          ...menuData,
          nameMenu: "",
          description: "",
          imageUrl: imgDefault,
          available: true,
          price: 0,
        });
        setErrors({ initial: "initial" });
        return;
      } else {
        return;
      }
    }
    setMenuData({ ...menuData, imageUrl: imgUrl });
    const sendData = {
      nameMenu: menuData.nameMenu,
      description: menuData.description,
      imageUrl: imgUrl,
      price: menuData.price,
      available: menuData.available,
      tipo: menuData.tipeMenu,
      especialidad: menuData.specialtyMenu,
    };
    dispatch(postProduct(sendData));
    //* limpiar formulario
    setMenuData({
      ...menuData,
      nameMenu: "",
      description: "",
      imageUrl: imgDefault,
      available: true,
      price: 0,
    });
    setErrors({ initial: "initial" });

    setShowSuccessMessage(true); 
    setTimeout(() => {
        setShowSuccessMessage(false);
    }, 5000);
  };

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

  return (
    <>
    {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          ¡Plato agregado correctamente!
        </div>
      )}
      <div className={style.container_form}>
        <div className="mb-3">
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

        <div className="row g-2">
            <div className="col-md-4 flex-column ">
              <div className="d-flex align-items-center">
                  <label className="form-label" htmlFor="price">
                    Precio:
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
              </div>
              <span className="form-text text-danger">{errors.price}</span>
            </div>
            <div className="col-md-4 mt-3 mb-3 ">
              <label className="form-label d-flex  align-items-center ">
                Disponible:
                <Switch
                  onChange={handleChangeAvailable}
                  checked={menuData.available}
                />
              </label>
            </div>
        </div>

        {/*options*/}
        <div>
          <div className="mb-3 d-flex  align-items-center">
            <label className="form-label">Tipos de Platos:</label>

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
            <button className="btn btn-dark text-white" onClick={handleAddTipoComida}>Agregar</button>
          </div>

          <div className="mb-3 d-flex  align-items-center ">
            <label className="form-label">Especialidades:</label>
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
            <button className="btn btn-dark text-white" onClick={handleAddSpecial}>Agregar</button>

          </div>
        </div>

        <div className="d-flex justify-content-end">
            <div className="mb-3 mx-2">
              <button className="btn btn-warning text-white" onClick={handleUploadButtonClick}>
                Upload Image
              </button>
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt="Uploaded"
                  style={{ marginLeft: "10px", maxWidth: "150px" }}
                />
              )}
            </div>
            <div className="mb-3">
              <button
                className="btn btn-success px-5"
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitButtonDisabled}
              >
                CREAR
              </button>
            </div>
        </div>

      </div>
    </>
  );
};

export default FormAdmin;
