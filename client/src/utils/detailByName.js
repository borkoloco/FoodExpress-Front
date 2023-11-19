

/**Archivo temporal para simular que obtienes el detalle de un menu o plato */

import menu from "../Views/Home/menu"

export const getMenu = (name) => {
    const menuHardCode = menu();
    const menuEncontrado = menuHardCode.find(menu => menu.nameMenu === name);
    return menuEncontrado || null;
}