// import axios from 'axios'
import menu from "../../Views/Home/menu";
import {
  specialty,
  typesOfFood,
  addSpecialty,
  addTypes,
} from "../../Views/Home/datosParaFiltros";

export const ALL_MENU = "ALL_MENU";
export const ALL_SPECIALTIES = "ALL_SPECIALTIES";
export const ALL_TYPES = "ALL_TYPES";
export const FILTERS = "FILTERS";
export const ORDER = "ORDER";
export const POST_MENU = "POST_MENU";

export const getAllMenu = () => {
  /////aca se pone el axios para traer del back todo el menu
  return async (dispatch) => {
    try {
      const data = await menu();
      return dispatch({
        type: ALL_MENU,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getSpecialties = () => {
  return async (dispatch) => {
    try {
      const data = await specialty();

      return dispatch({
        type: ALL_SPECIALTIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getTypesOfFood = () => {
  return async (dispatch) => {
    try {
      const data = await typesOfFood();
      return dispatch({
        type: ALL_TYPES,
        payload: data,
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

//dar de alta un producto/plato en la BD
export const postProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("ENDPOINT", product);
      dispatch({
        type: POST_MENU,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postSpecialties = (value) => {
  return async (dispatch) => {
    try {
      const data = await addSpecialty(value);

      return dispatch({
        type: ALL_SPECIALTIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postTypesOfFood = (value) => {
  return async (dispatch) => {
    try {
      const data = await addTypes(value);

      return dispatch({
        type: ALL_TYPES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
