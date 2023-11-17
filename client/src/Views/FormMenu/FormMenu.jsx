import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import validations from "../../utils/validations";

const FormMenu = () => {
  const [menuData, setMenuData] = useState({
    //idMenu sería Integer y autoIncrement
    nameMenu: "", //string de unos 30 caracteres
    description: "", //string de 255 caracteres estimo
    imageUrl: "", //string de 255 caracteres
    price: 0, //Decimal de 2 posiciones flotantes
    available: true, //booleano disponible o no disponoble
    tipeMenu: "Platos", //string ENUM Platos, Postres, Bebidas...
    specialtyMenu: "Tradicional", //string ENUM Tradicional, Vegetariano, Libre de glúten
  });

  const [errors, setErrors] = useState({ initial: "initial" });
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

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
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!imgUrl) {
      const result = window.confirm("Crear un plato sin imagen?");
      if (result) {
        console.log(menuData);
        return;
      } else {
        return;
      }
    }
    setMenuData({ ...menuData, imageUrl: imgUrl });
    console.log(menuData);
    // ¡Continúa con la lógica!
  };

  //!cloudinary
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imgUrl, setImgUrl] = useState("");

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
    <div>
      <h2>Crea tu nuevo plato</h2>

      <br />
      <label htmlFor="nameMenu">Plato: </label>
      <input
        type="text"
        name="nameMenu"
        id="nameMenu"
        placeholder="Nombre del plato"
        value={menuData.nameMenu}
        onChange={handleChange}
      />
      <span>{errors.nameMenu}</span>
      <br />
      <label htmlFor="description">Descripción: </label>
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Descripción del plato"
        value={menuData.description}
        onChange={handleChange}
      />
      <span>{errors.description}</span>
      <br />
      <label htmlFor="price">Precio: </label>
      <input
        type="number"
        name="price"
        id="price"
        placeholder="Precio del plato"
        value={menuData.price}
        onChange={handleChange}
      />
      <span>{errors.price}</span>
      <br />
      <label>
        Disponible:{"  "}
        <Switch onChange={handleChangeAvailable} checked={menuData.available} />
      </label>
      <br />
      {/*options*/}
      <div>
        <div>
          <h3>Tipos de Platos:</h3>
          <label>
            <input
              type="radio"
              value="Platos"
              checked={menuData.tipeMenu === "Platos"}
              onChange={handleTipoPlatoChange}
            />
            Platos
          </label>
          <label>
            <input
              type="radio"
              value="Postres"
              checked={menuData.tipeMenu === "Postres"}
              onChange={handleTipoPlatoChange}
            />
            Postres
          </label>
          <label>
            <input
              type="radio"
              value="Bebidas"
              checked={menuData.tipeMenu === "Bebidas"}
              onChange={handleTipoPlatoChange}
            />
            Bebidas
          </label>
        </div>

        <div>
          <h3>Especialidades:</h3>
          <label>
            <input
              type="radio"
              value="Tradicional"
              checked={menuData.specialtyMenu === "Tradicional"}
              onChange={handleEspecialidadChange}
            />
            Tradicional
          </label>
          <label>
            <input
              type="radio"
              value="Vegetariano"
              checked={menuData.specialtyMenu === "Vegetariano"}
              onChange={handleEspecialidadChange}
            />
            Vegetariano
          </label>
          <label>
            <input
              type="radio"
              value="Libre de glúten"
              checked={menuData.specialtyMenu === "Libre de glúten"}
              onChange={handleEspecialidadChange}
            />
            Libre de glúten
          </label>
        </div>
      </div>
      <br />
      <div>
        <button onClick={handleUploadButtonClick}>Upload</button>
        {imgUrl && (
          <img
            src={imgUrl}
            alt="Uploaded"
            style={{ marginLeft: "10px", maxWidth: "150px" }}
          />
        )}
      </div>
      <br />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitButtonDisabled}
      >
        Agregar
      </button>
    </div>
  );
};

export default FormMenu;
