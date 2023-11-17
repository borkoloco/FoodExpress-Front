import { ALL_MENU } from "../action/action";




const initialState = {
    allMenu : []
}
const rootReducer = (state = initialState, action) => {
    const payload = action.payload
    switch (action.type) {
        case ALL_MENU:
            return {
                ...state, allMenu:payload
            }
            
            break;
    
        default:
            return state;
            break;
    }
}

export default rootReducer;