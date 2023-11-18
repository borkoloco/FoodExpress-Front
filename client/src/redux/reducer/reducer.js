import { ALL_MENU, ALL_SPECIALTIES, ALL_TYPES, FILTERS} from "../action/action";




const initialState = {
    allMenu: [],
    allMenuOriginal:[], 
    allSpecialties: [],
    allTypesOfFood: [],
}
const rootReducer = (state = initialState, action) => {
    const payload = action.payload
    switch (action.type) {
        case ALL_MENU:
            return {
                ...state, allMenu:payload, allMenuOriginal:payload
            }
            
            break;
        
        case ALL_SPECIALTIES:
            return {
                ...state, allSpecialties: payload
            }
            break;
        
        case ALL_TYPES:
            return {
                ...state, allTypesOfFood: payload
            }
            break;
        case FILTERS:
            let { specialties, typesOfFood, availability } = payload
            
            if (specialties === 'all' && typesOfFood === 'all' && availability ==='all') {
                return {
                    ...state, allMenu: state.allMenuOriginal
                }
            }
            
            
            const filteredMenu = state.allMenuOriginal.slice().filter((el) => {
                return (
                    (specialties === 'all' || el.specialtyMenu === specialties) &&
                    (typesOfFood === 'all' || el.typeMenu === typesOfFood) &&
                    (availability === 'all' || el.available === Boolean(parseInt(availability)))
                )
            })
            
            return {
                ...state, allMenu: filteredMenu
            }
               
        
        
        
        
        
        default:
            return state;
            break;
    }
}

export default rootReducer;