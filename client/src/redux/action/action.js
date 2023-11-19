// import axios from 'axios'
import menu from '../../Views/Home/menu'
import { specialty, typesOfFood } from '../../Views/Home/datosParaFiltros'
import { getMenu } from '../../utils/detailByName'

export const ALL_MENU = 'ALL_MENU'
export const GET_MENU_DETAIL_BY_NAME = 'GET_MENU_DETAIL_BY_NAME'
export const CLEAN_DETAIL_MENU = 'CLEAN_DETAIL_MENU'
export const ALL_SPECIALTIES = 'ALL_SPECIALTIES'
export const ALL_TYPES = 'ALL_TYPES'
export const FILTERS = 'FILTERS'
export const ORDER = 'ORDER'



export const getAllMenu = () => {
    /////aca se pone el axios para traer del back todo el menu
    return async (dispatch) => {
        try {
            const data = await menu();
            return dispatch({
                type: ALL_MENU,
                payload: data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    
}

/* Actions para el Detail */
export const getMenuDetailByName = (name) => {
    return async (dispatch) => {
        try {
            const data = await getMenu(name);
            return dispatch({
                type: GET_MENU_DETAIL_BY_NAME,
                payload: data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    
}
export const cleanDetailMenu = () => {
    return { type: CLEAN_DETAIL_MENU };
  };




export const getSpecialties = () => {
    return async (dispatch) => {
        try {
            const data = await specialty();

            return dispatch({
                type: ALL_SPECIALTIES,
                payload: data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getTypesOfFood = () => {
    return async (dispatch) => {
        try {
            const data = await typesOfFood();
            return dispatch({
                type: ALL_TYPES,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const filters = (props) => {
   
    let { specialties, types, availability } = props
    if (specialties === '') {
        specialties = 'all'
    }
    if (types === '') {
        types = 'all'
    }
    
    if (availability === '') {
        availability = 'all'
    } 
    
    
    return (dispatch) => {

        return dispatch({
            type: FILTERS,
            payload: {
                specialties: specialties,
                typesOfFood: types,
                availability: availability
            }
        })
    }


    
}

export const orderMenu = (prop) => {
    return (dispatch) => {
        return dispatch({
            type: ORDER,
            payload: prop,
        })
    }
}