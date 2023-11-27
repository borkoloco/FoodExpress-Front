import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import validations from "../../../utils/validations";
import style from "./FormMenu.module.css";
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

const FormMenuEdit = ({
  upName,
  upDesc,
  upImg,
  upPrice,
  upAvailable,
  upType,
  upSpecial,
}) => {
  const imgDefault =
    "https://res.cloudinary.com/foodexpressimg/image/upload/v1700339341/FoodExpressImg/FoodLogo_nsnkjw.png";
  const [menuData, setMenuData] = useState({
    //idMenu sería Integer y autoIncrement
    nameMenu: upName, //string de unos 30 caracteres
    description: upDesc, //string de 255 caracteres estimo
    imageUrl: upImg, //string de 255 caracteres
    price: upPrice, //Decimal de 2 posiciones flotantes
    available: upAvailable, //booleano disponible o no disponoble
    tipeMenu: upType,
    specialtyMenu: upSpecial,
  });

  const [errors, setErrors] = useState({ initial: "initial" });
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
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
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "Especialidades",
      inputPlaceholder: "Ingresa una especialidad aquí...",
      inputAttributes: {
        "aria-label": "Ingresa una especialidad aquí...",
      },
      showCancelButton: true,
    });
    if (text) {
      if (validationsCategories(text)) {
        await dispatch(postSpecialties(text));
        await dispatch(getSpecialties());
        setForce(!force);
      }
    }
  };

  const handleAddTipoComida = async () => {
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "Tipo de plato",
      inputPlaceholder: "Ingresa un tipo aquí...",
      inputAttributes: {
        "aria-label": "Ingresa un tipo aquí...",
      },
      showCancelButton: true,
    });
    if (text) {
      if (validationsCategories(text)) {
        await dispatch(postTypesOfFood(text));
        await dispatch(getTypesOfFood());
        setForce(!force);
      }
    }
  };

  const validationsCategories = (value) => {
    if (value === "") {
      Swal.fire("Debes ingresar una categoria");
      return false;
    } else if (value.trim() === "") {
      Swal.fire("No uses cadenas de espacios");
      return false;
    } else if (value.length < 2 || value.length > 30) {
      Swal.fire("Usa entre 2 y 30 caracteres");
      return false;
    } else if (!regexName.test(value)) {
      Swal.fire("Usa solo letras y espacios");
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

  // useEffect(() => {
  //   if (allSpecialties.length !== 0) {
  //     setMenuData((prevMenuData) => ({
  //       ...prevMenuData,
  //       specialtyMenu: allSpecialties[0].name,
  //     }));
  //   }
  // }, [allSpecialties]);

  // useEffect(() => {
  //   if (allTypesOfFood.length !== 0) {
  //     setMenuData((prevMenuData) => ({
  //       ...prevMenuData,
  //       tipeMenu: allTypesOfFood[0].name,
  //     }));
  //   }
  // }, [allTypesOfFood]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imgUrl) {
      const result = await Swal.fire({
        title: "Crear un plato sin imagen?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Okey",
        denyButtonText: `Cancelar`,
      });

      if (result.isConfirmed) {
        // Swal.fire("Saved!", "", "success");
        const sendData = {
          nameMenu: menuData.nameMenu,
          description: menuData.description,
          imageUrl: menuData.imageUrl,
          price: menuData.price,
          available: menuData.available,
          tipo: menuData.tipeMenu,
          especialidad: menuData.specialtyMenu,
        };
        await dispatch(postProduct(sendData));
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
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
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
      <BackButton />
      <div className={style.container_form}>
        <h2>Edita el plato seleccionado</h2>
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
        {/*options*/}
        <div>
          <div className="mb-3">
            <label className="form-label">Tipos de Platos:</label>{" "}
            <button onClick={handleAddTipoComida}>Agregar</button>
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
            <button onClick={handleAddSpecial}>Agregar</button>
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
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitButtonDisabled}
          >
            Agregar
          </button>
        </div>
      </div>
    </>
  );
};

export default FormMenuEdit;
