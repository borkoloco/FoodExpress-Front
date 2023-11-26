import {
  ALL_MENU,
  ALL_SPECIALTIES,
  ALL_TYPES,
  FILTERS,
  ORDER,
  POST_MENU,
  SET_CURRENT_PAGE,
  GET_MENU_DETAIL_BY_ID,
  CLEAN_DETAIL_MENU,
  SEARCH_INPUT,
  GET_MENUS_BY_NAME,
  LOGIN,
  LOGOUT,
  UISTARTLOADING,
  UIFINISHLOADING,
  LOGIN_BY_USER,
  LOGOUT_BY_USER
} from "../actions/action";

const initialState = {
  allMenu: [],
  menuDetail: {},
  allMenuOriginal: [],
  allSpecialties: [],
  allTypesOfFood: [],
  menu: null,
  currentPage: 1,
  itemsPerPage: 3,
  input: "",
  uid: null,
  displayName: null,
  userAuth:{}
};
const rootReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        uid: payload.uid,
        displayName: payload.displayName,
      };
    case LOGOUT:
      return {
        ...state,
        uid: null,
        displayName: null,
      };

    case SET_CURRENT_PAGE: //paginacion
      return {
        ...state,
        currentPage: payload,
      };
    case POST_MENU:
      return {
        ...state,
        menu: payload,
      };

    case ALL_MENU:
      return {
        ...state,
        allMenu: payload,
        allMenuOriginal: payload,
      };

      break;

    /*Menu detail */
    case GET_MENU_DETAIL_BY_ID:
      return { ...state, menuDetail: payload };
    case CLEAN_DETAIL_MENU:
      return { ...state, menuDetail: {} };

    case ALL_SPECIALTIES:
      return {
        ...state,
        allSpecialties: payload,
      };
      break;

    case ALL_TYPES:
      return {
        ...state,
        allTypesOfFood: payload,
      };

      break;
    case FILTERS:
      let { specialties, typesOfFood, availability } = payload;

      if (
        specialties === "all" &&
        typesOfFood === "all" &&
        availability === "all"
      ) {
        return {
          ...state,
          allMenu: state.allMenuOriginal,
        };
      }

      const filteredMenu = state.allMenuOriginal.slice().filter((el) => {
        return (
          (specialties === "all" || el.specialtyMenu === specialties) &&
          (typesOfFood === "all" || el.typeMenu === typesOfFood) &&
          (availability === "all" ||
            el.available === Boolean(parseInt(availability)))
        );
      });

      return {
        ...state,
        allMenu: filteredMenu,
        currentPage: 1,
      };

    case ORDER:
      console.log(state.allMenu[0].price);
      if (payload === "nameUp") {
        return {
          ...state,
          allMenu: state.allMenu
            .slice()
            .sort((a, b) => a.nameMenu.localeCompare(b.nameMenu)),
        };
      }
      if (payload === "nameDown") {
        return {
          ...state,
          allMenu: state.allMenu
            .slice()
            .sort((a, b) => b.nameMenu.localeCompare(a.nameMenu)),
        };
      }

      if (payload === "priceUp") {
        return {
          ...state,
          allMenu: state.allMenu.slice().sort((a, b) => a.price - b.price),
        };
      }
      if (payload === "priceDown") {
        return {
          ...state,
          allMenu: state.allMenu.slice().sort((a, b) => b.price - a.price),
        };
      }

    /* Menú SearchBar */
    case SEARCH_INPUT:
      return { ...state, input: payload };

    case GET_MENUS_BY_NAME:
      return {
        ...state,
        allMenu: payload,
        allMenuOriginal: payload,
      };


    /* Login con Usuario: Email y password */
    case LOGIN_BY_USER:
      return {
        ...state,
        userAuth:payload,
      };
    case LOGOUT_BY_USER:
      return {
        ...state,
        userAuth:{},
      };

    default:
      return state;
      break;
  }
};

export default rootReducer;