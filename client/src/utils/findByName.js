/**Archivo temporal para simular la busqueda de un plato*/


export const findByName = (array, name) => {
  const resultados = array.filter((menu) => {
    // Convertimos ambos strings a minúsculas para hacer la comparación insensible a mayúsculas
    const nombreMenuMinuscula = menu.nameMenu.toLowerCase();
    const nombreIngresadoMinuscula = name.toLowerCase();

    // Verificamos si el nombre del menú incluye el texto ingresado (búsqueda parcial)
    return nombreMenuMinuscula.includes(nombreIngresadoMinuscula);
  });

  return resultados;
};
