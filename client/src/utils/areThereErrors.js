


export const areThereErrors = (objeto) => {
  for (let propiedad in objeto) {
    if (objeto.hasOwnProperty(propiedad) && objeto[propiedad] !== "") {
      return false;
    }
  }
  return true; // Todas las propiedades tienen el valor ""
};

