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
  LOGOUT_BY_USER,
  REGISTER_BY_USER,
  USERLOGUED,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_MENU_AVAILABILITY,
  ALLREVIEWS,
  GET_REVIEW_BY_IDMENU,
  GET_REVIEW_BY_ID,
  GET_REVIEW_BY_IDUSER,
  GET_AVDREVIEW_BYIDMENU,
  GET_CART_BY_USER,
  GET_AVGALL,
  SEND_CART_MERCADO_PAGO,

} from "../actions/action";

const initialState = {
  allMenu: [],
  menuDetail: {},
  allMenuOriginal: [],
  allSpecialties: [],
  allTypesOfFood: [],
  menu: null,
  currentPage: 1,
  itemsPerPage: 6,
  input: "",
  uid: null,
  displayName: null,
  displayEmail: null,
  userLogued: {},
  userAuth: {},
  userRegistered: {},
  filterGlobalState: {
    specialties: "all",
    typesOfFood: "all",
    availability: "all",
  },
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  cartItemsDB:[],
  allreviews: [],
  reviewsByIdMenu: [],
  reviewsByIdUser: [],
  reviewAVGbyIdMenu: "",
  reviewsAvgAll: [],
  cartBDTemp: [],
  linkMercadoPago: "",
};
const rootReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_AVGALL:
      return {
        ...state,
        reviewsAvgAll: payload,
      };
    case GET_AVDREVIEW_BYIDMENU:
      return {
        ...state,
        reviewAVGbyIdMenu: payload,
      };
    case GET_REVIEW_BY_IDUSER:
      return {
        ...state,
        reviewsByIdMenu: payload,
      };
    case GET_REVIEW_BY_IDMENU:
      return {
        ...state,
        reviewsByIdMenu: payload,
      };
    case ALLREVIEWS:
      return {
        ...state,
        allreviews: payload,
      };
    case USERLOGUED:
      return {
        ...state,
        userLogued: payload,
      };
    case LOGIN:
      return {
        ...state,
        uid: payload.uid,
        displayName: payload.displayName,
        displayEmail: payload.displayEmail,
      };
    case LOGOUT:
      return {
        ...state,
        uid: null,
        displayName: null,
        displayEmail: null,
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
          filterGlobalState: {
            specialties: "all",
            typesOfFood: "all",
            availability: "all",
          },
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
        filterGlobalState: {
          specialties: specialties,
          typesOfFood: typesOfFood,
          availability: availability,
        },
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
        userAuth: payload.data,
        cartItemsDB:payload.dataCartDB

      };
    case LOGOUT_BY_USER:
      localStorage.setItem("cart", JSON.stringify([]));
      return {
        ...state,
        userAuth: {},
        userLogued: {},
        cartItems:[],
        cartItemsDB:[],
      };

    /* Registro con usuario, email y password */
    case REGISTER_BY_USER:
      return {
        ...state,
        userRegistered: payload,
      };

    /** Add to cart icono del carrito */
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        const updatedItem = { ...state.cartItems[existingItemIndex] };
        updatedItem.amount += newItem.amount;
        updatedCart = [...state.cartItems];
        updatedCart[existingItemIndex] = updatedItem;
      } else {
        updatedCart = [...state.cartItems, newItem];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cartItems: updatedCart,
        
      };

    case REMOVE_FROM_CART:
      const itemToRemove = action.payload;
      const itemIndexToRemove = state.cartItems.findIndex(
        (item) => item.id === itemToRemove.id
      );

      if (itemIndexToRemove !== -1) {
        const updatedCart = [...state.cartItems];
        updatedCart.splice(itemIndexToRemove, 1);

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return {
          ...state,
          cartItems: updatedCart,
        };
      }

    // borrado logico
    case UPDATE_MENU_AVAILABILITY:
      return {
        ...state,
        allMenu: state.allMenu.map((menu) => {
          if (menu.idMenu === action.payload.menuId) {
            return {
              ...menu,
              available: action.payload.newAvailability,
            };
          }
          return menu;
        }),
      };

    case GET_CART_BY_USER:
      return {
        ...state,
        cartBDTemp: payload,
      };

    case SEND_CART_MERCADO_PAGO:
      return {
        ...state,
        linkMercadoPago: payload,
      };

    

    default:
      return state;
      break;
  }
};

export default rootReducer;
