// const specialties = ["Tradicional", "Vegetariano", "Libre de gluten"];

// const types = ["Plato", "Ensalada", "Postre", "Bebida"];

// var types = [
//   { id: 1, name: "Platos" },
//   { id: 2, name: "Postres" },
//   { id: 3, name: "Bebidas" },
//   { id: 4, name: "Ensalada" },
// ];
// var specialties = [
//   { id: 1, name: "Tradicional" },
//   { id: 2, name: "Vegetariano" },
//   { id: 3, name: "Libre de gluten" },
//   { id: 4, name: "Otros" },
// ];

// export const specialty = () => {
//   return specialties;
// };

// export const typesOfFood = () => {
//   return types;
// };

export const addSpecialty = (value) => {
  specialties.push({ id: specialties.length + 1, name: value });
  return specialties;
};

export const addTypes = (value) => {
  types.push({ id: types.length + 1, name: value });
  return types;
};
