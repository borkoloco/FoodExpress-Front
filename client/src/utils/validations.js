export default function validations(data) {
  let errors = {};
  const regexName = /^[A-Za-z\s]+$/;

  //tratamiento del name/nombre del plato
  if (!data.nameMenu) {
    errors.nameMenu = "Ingresa un nombre para el plato";
  } else {
    if (data.nameMenu.trim() === "") {
      errors.nameMenu = "No uses cadenas de espacios";
    } else {
      if (data.nameMenu.length < 2 || data.nameMenu.length > 30)
        errors.nameMenu = "Nombre entre 2 y 30 caracteres";
      if (!regexName.test(data.nameMenu))
        errors.nameMenu = "Usa solo letras y espacios";
    }
  }

  //tratamiento de la descripción
  if (!data.description) {
    errors.description = "Ingresa una descripción para el plato";
  } else {
    if (data.description.trim() === "") {
      errors.description = "No uses cadenas de espacios";
    } else {
      if (data.description.length < 2 || data.description.length > 250)
        errors.description = "Descripción entre 2 y 250 caracteres";
    }
  }

  //tratamiento del precio
  if (!data.price) {
    errors.price = "Ingresa un precio";
  } else {
    if (Number(data.price) <= 0) {
      errors.price = "El precio debe ser mayor que cero";
    } else {
      if (Number(data.price) > 50000) {
        errors.price = "Precio Max establecido en $50.000";
      } else {
      }
    }
  }

  return errors;
}
