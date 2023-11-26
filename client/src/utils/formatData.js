/**
 *  Función reutilizable para estandarizar y ordenar la data
 *  que viene del back
 */

export const formatData = (data) => {
  const newData = data
    .map((dat) => ({
      idMenu: dat.idMenu,
      nameMenu: dat.nameMenu,
      description: dat.description,
      imageUrl: dat.imageUrl,
      price: dat.price,
      available: dat.available,
      typeMenu: dat.typeMenu.nameTipo,
      specialtyMenu: dat.specialtyMenu.NameEspecialidad,
    }))
    .sort((a, b) => a.nameMenu.localeCompare(b.nameMenu));
  return newData;
};
