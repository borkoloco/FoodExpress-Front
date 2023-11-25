import axios from "axios";
import { firebase, googleAuthProvider } from "../../utils/firebase";

/*
import menu, { postMenu } from "../../Views/Home/menu";
import {
  specialty,
  typesOfFood,
  addSpecialty,
  addTypes,
} from "../../Views/Home/datosParaFiltros";

*/

export const ALL_MENU = "ALL_MENU";
export const GET_MENU_DETAIL_BY_ID = "GET_MENU_DETAIL_BY_ID";
export const CLEAN_DETAIL_MENU = "CLEAN_DETAIL_MENU";
export const ALL_SPECIALTIES = "ALL_SPECIALTIES";
export const ALL_TYPES = "ALL_TYPES";
export const FILTERS = "FILTERS";
export const ORDER = "ORDER";
export const POST_MENU = "POST_MENU";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SEARCH_INPUT = "SEARCH_INPUT";
export const GET_MENUS_BY_NAME = "GET_MENUS_BY_NAME";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UISTARTLOADING = "UISTARTLOADING";
export const UIFINISHLOADING = "UIFINISHLOADING";

const endPoint = "http://localhost:3001";

//funciones para el logueo
export const login = (uid, displayName) => {
  return {
    type: LOGIN,
    payload: { uid, displayName },
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
export const startGoogleAuth = () => {
  return (dispatch) => {
    firebase
      .auth()
      // .signInWithRedirect(googleAuthProvider)
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        console.log(user);
        console.log(user.uid + "   " + user.displayName);
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => console.log(e));
  };
};

//actualizar un tipo de comida en categorías
export const updateType = (id, nameTipo) => {
  const endPointUpdateType = endPoint + "/updatetipo/" + id;
  const dataSend = { nameTipo };
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(endPointUpdateType, dataSend);
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//actualizar especialidad en categorías
export const updateSpecialty = (id, nameSpecialty) => {
  const endPointUpdateType = endPoint + "/updatespecialty" + id;
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(endPointUpdateType, nameSpecialty);

      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllMenu = () => {
  ///aca se pone el axios para traer del back todo el menu
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endPoint + "/menus");

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

      return dispatch({
        type: ALL_MENU,
        payload: newData,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

/* Actions para el Detail */
export const getMenuDetailById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endPoint + `/menus/${id}`);

      const newData = {
        idMenu: data.idMenu,
        nameMenu: data.nameMenu,
        description: data.description,
        imageUrl: data.imageUrl,
        price: data.price,
        available: data.available,
        typeMenu: data.typeMenu.nameTipo,
        specialtyMenu: data.specialtyMenu.NameEspecialidad,
      };
      return dispatch({
        type: GET_MENU_DETAIL_BY_ID,
        payload: newData,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const cleanDetailMenu = () => {
  return { type: CLEAN_DETAIL_MENU };
};

export const getSpecialties = () => {
  return async (dispatch) => {
    try {
      //{"idEspecialidad": 1, "NameEspecialidad": "hola"
      // const data = await specialty();
      const { data } = await axios(endPoint + "/especialidades");

      // Mapear y ordenar alfabéticamente por nameTipo
      const newData = data
        .map(({ idEspecialidad, NameEspecialidad }) => ({
          id: idEspecialidad,
          name: NameEspecialidad,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      return dispatch({
        type: ALL_SPECIALTIES,
        payload: newData,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getTypesOfFood = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint + "/tipos");

      // Mapear y ordenar alfabéticamente por nameTipo
      const newData = data
        .map(({ idTipoMenu, nameTipo }) => ({
          id: idTipoMenu,
          name: nameTipo,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      return dispatch({
        type: ALL_TYPES,
        payload: newData,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filters = (props) => {
  let { specialties, types, availability } = props;
  if (specialties === "") {
    specialties = "all";
  }
  if (types === "") {
    types = "all";
  }

  if (availability === "") {
    availability = "all";
  }

  return (dispatch) => {
    return dispatch({
      type: FILTERS,
      payload: {
        specialties: specialties,
        typesOfFood: types,
        availability: availability,
      },
    });
  };
};

export const orderMenu = (prop) => {
  return (dispatch) => {
    return dispatch({
      type: ORDER,
      payload: prop,
    });
  };
};

//fn dar de alta un producto/plato en la BD
export const postProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endPoint + "/addmenu", product);

      // const data = postMenu(product);
      dispatch({
        type: "", //POST_MENU
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//fn post tipo de especialidad
export const postSpecialties = (value) => {
  return async (dispatch) => {
    try {
      const valueType = { NameEspecialidad: value };
      //{"idEspecialidad": 1, "NameEspecialidad": "hola"}
      //data devuelve el elemento agregado
      // const data = await addSpecialty(value);
      const { data } = await axios.post(
        endPoint + "/addespecialidad",
        valueType
      );
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//fn post tipo de comida o plato
export const postTypesOfFood = (value) => {
  const valueType = { nameTipo: value };
  return async (dispatch) => {
    try {
      // const hardcode = await addTypes(value);
      const { data } = await axios.post(endPoint + "/addtipo", valueType);
      //data es {idTipoMenu, nameTipo}
      //es el elemento agregado
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//fn para el paginado
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

/*  ACTIONS PARA EL SEARCH */
export const setInput = (valor) => {
  return { type: SEARCH_INPUT, payload: valor };
};
export const getMenusByName = (name) => {
  return { type: GET_MENUS_BY_NAME, payload: name };
};

/* DESCOMENTAR AQUI SI YA ESTÁ HECHO EL ENDPOINT PARA BUSCAR BYQUERY */
// export const getMenus = (name) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.get(endPoint + `/menus/?name=${name}`);
//       return dispatch({
//         type: GET_MENUS_BY_NAME,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };
