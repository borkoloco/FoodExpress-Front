// import axios from 'axios'
import menu from '../../Views/Home/menu'

export const ALL_MENU = 'ALL_MENU'

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