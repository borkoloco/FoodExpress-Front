import React from "react";

const menuHardCode = [
  {
    nameMenu: "Hamburguesa",
    description: "Deliciosa hamburguesa con queso, lechuga y tomate",
    imageUrl:
      "https://www.visitdubai.com/-/media/images/leisure/campaigns/delicious-dubai-nordics/nordics-campaign-arabic-food-dubai-header-2.jpg?&cw=256&ch=256",
    price: 10.99,
    available: true,
    typeMenu: "Platos",
    specialtyMenu: "Tradicional",
  },
  {
    nameMenu: "Pasta Alfredo",
    description: "Pasta con salsa Alfredo, pollo y champiñones",
    imageUrl:
      "https://www.visitdubai.com/-/media/images/leisure/campaigns/delicious-dubai-nordics/nordics-campaign-arabic-food-dubai-header-2.jpg?&cw=256&ch=256",
    price: 12.99,
    available: false,
    typeMenu: "Platos",
    specialtyMenu: "Libre de gluten",
  },
  {
    nameMenu: "Ensalada César",
    description: "Ensalada fresca con pollo a la parrilla y aderezo César",
    imageUrl:
      "https://www.visitdubai.com/-/media/images/leisure/campaigns/delicious-dubai-nordics/nordics-campaign-arabic-food-dubai-header-2.jpg?&cw=256&ch=256",
    price: 8.99,
    available: true,
    typeMenu: "Ensalada",
    specialtyMenu: "Vegetariano",
  },
  // Agrega más objetos según sea necesario
  {
    nameMenu: "Pizza Margherita",
    description: "Pizza con tomate, mozzarella y albahaca",
    imageUrl:
      "https://www.visitdubai.com/-/media/images/leisure/campaigns/delicious-dubai-nordics/nordics-campaign-arabic-food-dubai-header-2.jpg?&cw=256&ch=25PostresPostres6",
    price: 14.99,
    available: false,
    typeMenu: "Platos",
    specialtyMenu: "Tradicional",
  },
  {
    nameMenu: "Tarta de Manzana",
    description: "Deliciosa tarta de manzana con canela",
    imageUrl:
      "https://www.visitdubai.com/-/media/images/leisure/campaigns/delicious-dubai-nordics/nordics-campaign-arabic-food-dubai-header-2.jpg?&cw=256&ch=256",
    price: 9.99,
    available: true,
    typeMenu: "Postres",
    specialtyMenu: "Libre de gluten",
  },
  {
    nameMenu: "Smoothie de Frutas",
    description: "Bebidas refrescante con mezcla de frutas",
    imageUrl:
      "https://www.visitdubai.com/-/media/images/leisure/campaigns/delicious-dubai-nordics/nordics-campaign-arabic-food-dubai-header-2.jpg?&cw=256&ch=256",
    price: 5.99,
    available: false,
    typeMenu: "Bebidas",
    specialtyMenu: "Vegetariano",
  },
  {
    nameMenu: "Choripan",
    description: "Pan con chorizo y chimicchurri",
    imageUrl:
      "https://www.visitdubai.com/-/media/images/leisure/campaigns/delicious-dubai-nordics/nordics-campaign-arabic-food-dubai-header-2.jpg?&cw=256&ch=256",
    price: 2,
    available: true,
    typeMenu: "Platos",
    specialtyMenu: "Tradicional",
  },
  {
    nameMenu: "Pure de papa",
    description: "Papas pisadas con crema , leche y queso",
    imageUrl:
      "https://www.visitdubai.com/-/media/images/leisure/campaigns/delicious-dubai-nordics/nordics-campaign-arabic-food-dubai-header-2.jpg?&cw=256&ch=256",
    price: 5.99,
    available: false,
    typeMenu: "Platos",
    specialtyMenu: "Vegetariano",
  },
  // Agrega más objetos según sea necesario
];

function menu() {
  return menuHardCode;
}

export const postMenu = (obj) => {
  const newObj = {
    nameMenu: obj.nameMenu,
    description: obj.description,
    imageUrl: obj.imageUrl,
    price: obj.price,
    available: obj.available,
    typeMenu: obj.tipeMenu,
    specialtyMenu: obj.specialtyMenu,
  };

  menuHardCode.push(newObj);
};

export default menu;
