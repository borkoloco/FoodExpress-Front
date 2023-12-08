import axios from "axios";
import Swal from "sweetalert2";

import { formatData } from "../../utils/formatData";
import { firebase, googleAuthProvider, auth } from "../../utils/firebase";

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
export const LOGIN_BY_USER = "LOGIN_BY_USER";
export const LOGOUT_BY_USER = "LOGOUT_BY_USER";
export const REGISTER_BY_USER = "REGISTER_BY_USER";
export const USERLOGUED = "USERLOGUED";
export const ADD_TO_CART = "ADD_TO_CART  ";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_MENU_AVAILABILITY = "UPDATE_MENU_AVAILABILITY";
export const ALLREVIEWS = "ALLREVIEWS";
export const GET_REVIEW_BY_ID = "GET_REVIEW_BY_ID";
export const GET_REVIEW_BY_IDMENU = "GET_REVIEW_BY_IDMENU";
export const GET_REVIEW_BY_IDUSER = "GET_REVIEW_BY_IDUSER";
export const GET_AVDREVIEW_BYIDMENU = "GET_AVDREVIEW_BYIDMENU";
export const GET_AVGALL = "GET_AVGALL";
export const GET_CART_BY_USER = "GET_CART_BY_USER";
export const SEND_CART_MERCADO_PAGO = "SEND_CART_MERCADO_PAGO";

const endPoint = import.meta.env.VITE_BACKEND_URL;

// const endPoint = 'http://localhost:3001';

//datos en nuestra BD del usuario logueado
export const user_logued = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endPoint + "/users/" + email);
      localStorage.setItem("sesion", JSON.stringify(data));
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Welcome ${data.nameUser}`,
        showConfirmButton: false,
        timer: 2000,
      });
      // console.log(data);
      return dispatch({
        type: USERLOGUED,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener el usuario en la BD: ", error.message);
    }
  };
};

//POST DEL NUEVO USUARIO EN NUESTRA BD
export const postUserBD = (
  nameUser,
  email,
  password,
  idRole,
  authProvider,
  idAuthProvider
) => {
  const sendData = {
    nameUser,
    email,
    password,
    idRole,
    authProvider,
    idAuthProvider,
  };
  return async (dispatch) => {
    try {
      const registerUser = await axios.post(endPoint + "/register", sendData);
      return dispatch({
        type: "",
        payload: registerUser,
      });
    } catch (error) {
      console.error("Error al guardar el usuario en la BD: ", error.message);
    }
  };
};

// Acción para iniciar sesión con correo electrónico y contraseña
export const startLoginWithEmail = (email, password) => {
  return async (dispatch) => {
    try {
      // Iniciar sesión con correo electrónico y contraseña
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      // Dispatch de la acción de login con los datos del usuario
      dispatch(login(user.uid, user.displayName, user.email));
      //determinar el rol del usuario

      dispatch(user_logued(user.email));
    } catch (error) {
      console.error(
        "Error al iniciar sesión con correo electrónico:",
        error.message
      );
      // Puedes dispatchear otra acción para manejar el error si es necesario
    }
  };
};

// Acción para crear usuario con correo electrónico y contraseña
export const startWithEmail = (email, password, username) => {
  return async (dispatch) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      // Dispatch de la acción de login con los datos del usuario
      // dispatch(login(user.uid, username, user));
      dispatch(postUserBD(username, user.email, "without", 1));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Listo, loguéate",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(
        "Error al iniciar sesión con correo electrónico:",
        error.message
      );
    }
  };
};

//funciones para el logueo con Google
export const login = (uid, displayName, displayEmail) => {
  return {
    type: LOGIN,
    payload: { uid, displayName, displayEmail },
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

//comprobar si existe email en nuestra BD, si no, crearlo
const testEmail = async (nameUser, email) => {
  try {
    // Buscar en la BD si matchea el email
    const user = await axios(endPoint + "/users/" + email);
    if (user && user.email) {
      console.log("Usuario ya existe en BD " + user.email);
    } else {
      // Dar de alta en BD al usuario si no existe
      const sendData = {
        nameUser,
        email,
        password: "without",
        idRole: 1,
      };
      await axios.post(endPoint + "/register", sendData);
      console.log("Usuario dado de alta");
    }
  } catch (error) {
    // Manejar el error de manera controlada
    console.log("Error al buscar el usuario: " + error.message);

    // Si la petición falla, intenta dar de alta al usuario
    const sendData = {
      nameUser,
      email,
      password: "without",
      idRole: 1,
    };
    try {
      await axios.post(endPoint + "/register", sendData);
      console.log("Usuario dado de alta después del error");
    } catch (error) {
      console.log("Error al dar de alta el usuario: " + error.message);
      // Puedes tomar acciones adicionales si es necesario
    }
  }
};

//iniciar sesion con google
export const startGoogleAuth = () => {
  return (dispatch) => {
    firebase
      .auth()
      // .signInWithRedirect(googleAuthProvider)
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        console.log(user);
        console.log(user.uid + "   " + user.displayName);
        dispatch(login(user.uid, user.displayName, user.email));
        testEmail(user.displayName, user.email);
        dispatch(user_logued(user.email));
      })
      .catch((e) => console.log(e));
  };
};
export const startGoogleLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
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
export const updateSpecialty = (id, nuevoNombre) => {
  const dataSend = { nuevoNombre };
  const endPointUpdateType = endPoint + "/updateespecialidad/" + id;
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

export const getAllMenu = () => {
  ///aca se pone el axios para traer del back todo el menu
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endPoint + "/menus");
      return dispatch({
        type: ALL_MENU,
        payload: formatData(data),
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
  console.log({
    specialties: specialties,
    typesOfFood: types,
    availability: availability,
  });
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
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Guardado con éxito",
        showConfirmButton: false,
        timer: 1500,
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
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endPoint + `/menu/?name=${name}`);
      return dispatch({
        type: GET_MENUS_BY_NAME,
        payload: formatData(data),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

/* ACTIONS PARA EL LOGIN CON usuario: Email Y Password */
export const loginByUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endPoint + "/login", user);
      localStorage.setItem("sesion", JSON.stringify(data.data));
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Welcome ${data.data.nameUser}`,
        showConfirmButton: false,
        timer: 2000,
      });
      const dataCartDB = await axios.get(
        endPoint + `/getcarrito/${data.data.idUser}`
      );

      let formatedDataCartDB = [];
      ///formatear datos para mandar al estado global
      dataCartDB.data.carritoItems.map((el) => {
        formatedDataCartDB.push({ id: el.menu.idMenu, amount: el.cantidad });
      });
      const dataTotal = { data: data, dataCartDB: formatedDataCartDB };

      // window.alert(data.message);
      return dispatch({
        type: LOGIN_BY_USER,
        payload: dataTotal,
      });
    } catch (error) {
      console.log(error.message);
      window.alert(error.response.data.error);
    }
  };
};

export const logoutByUser = () => {
  localStorage.removeItem("sesion");
  return { type: LOGOUT_BY_USER };
};

/* ACTIONS PARA EL REGISTRO CON usuario, email y password */
export const registerByUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endPoint + "/register", user);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Successful registration`,
        showConfirmButton: false,
        timer: 2000,
      });
      // console.log(data);
      return dispatch({
        type: REGISTER_BY_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      window.alert(error.response.data);
    }
  };
};

/** Carrito icono */
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = ({ id, amount }) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { id, amount },
  };
};

/// subir al carrito de la base de datos
export const addToCartDB = (item, idUser) => {
  return async () => {
    console.log("entra aca??");
    const formatedData = [
      { idUser: idUser, idMenu: item.id, cantidad: item.amount },
    ];
    console.log(formatedData);
    try {
      const sendData = await axios.post(
        endPoint + "/carrito/add",
        formatedData
      );
      console.log(sendData);
    } catch (error) {
      console.log(error.message);
    }
  };
};

//Action para el borrado lógico
export const updateMenuAvailability = (id, newAvailability) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`${endPoint}/menu/${id}`, {
        available: newAvailability,
      });

      if (response.status !== 200) {
        throw new Error("Error al actualizar la disponibilidad del menú");
      }

      dispatch({
        type: UPDATE_MENU_AVAILABILITY,
        payload: { id, newAvailability },
      });
    } catch (error) {
      console.error(
        "Error al actualizar la disponibilidplatoupdateMenuad del menú:",
        error
      );
      // Manejar errores, como dispatch de una acción de error
    }
  };
};

//actualizar un menu/plato
export const updateMenu = (id, value) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(endPoint + "/updatemenu/" + id, value);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      console.log("Error al actualizar el plato: " + error.message);
    }
  };
};

//eliminar un tipo de plato, en categorias
export const deleteType = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endPoint + "/deletetipo2/" + id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Categoría eliminada",
        showConfirmButton: false,
        timer: 1800,
      });
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudimos eliminar la categoría",
        footer: "",
      });
    }
  };
};
//eliminar una especialidad, en categorias
export const deleteSpecial = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endPoint + "/deleteespec2/" + id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Categoría eliminada",
        showConfirmButton: false,
        timer: 1800,
      });
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudimos eliminar la categoría",
        footer: "",
      });
    }
  };
};

//!SECCION REVIEWS Y PUNTUACION
//GET de todos los reviews
//devuelve un arrelgo de objetos {idReview, idUser, idMenu, rate, comment, date}
export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint + "/getallreviews");
      return dispatch({
        type: ALLREVIEWS,
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tuvimos un error al obtener los reviews",
        footer: "",
      });
      console.log("Tuvimos un error al obtener los reviews: " + error.message);
    }
  };
};

//POST de un nuevo review
//value debe ser { idUser, idMenu, rate, comment }
export const addReview = (value) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endPoint + "/addreview", value);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Gracias por calificar",
        showConfirmButton: false,
        timer: 1800,
      });
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tuvimos un error al agregar un review",
        footer: "",
      });
      console.log("Tuvimos un error al agregar un review: " + error.message);
    }
  };
};

//UPDATE de review por parte del usuario
// id por params, y rate, comment actualizados por body
export const updateReviewById = (id, rate, comment) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(endPoint + "/updatereview" + id, {
        rate,
        comment,
      });
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudimos actualizar tu review",
        footer: "",
      });
      console.log("No pudimos actualizar tu review: " + error.message);
    }
  };
};

//GET reviews por ID de menú/plato. Pasamos ID por params
//obtenemos todos los reviwes de un plato. Un Arreglo de objetos
export const getReviewsByMenu = (idMenu) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint + "/getreviewsmenu/" + idMenu);
      return dispatch({
        type: GET_REVIEW_BY_IDMENU,
        payload: data,
      });
    } catch (error) {
      console.log("No pudimos obtener los reviews");
      return dispatch({
        type: GET_REVIEW_BY_IDMENU,
        payload: [],
      });
    }
  };
};

//GET reviews por ID de usuario. Pasamos ID por params
//obtenemos todos los reviwes de un usuario. Un Arreglo de objetos
export const getReviewsByUser = (idUser) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint + "/getreviewsuser/" + idUser);
      return dispatch({
        type: GET_REVIEW_BY_IDUSER,
        payload: data,
      });
    } catch (error) {
      console.log("No pudimos obtener los reviews");
    }
  };
};

//GET promedio de puntuaciones de un producto por id de producto
// devuelve {"promedioRates": 3.6666666666666665 }
export const getAvgReviewByIdMenu = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint + "/getavgreview/" + id);
      const rawAverage = data.promedioRates ?? 0;
      // Redondear al múltiplo de 0.5 más cercano
      const roundedAverage = rawAverage.toFixed(1);

      return dispatch({
        type: GET_AVDREVIEW_BYIDMENU,
        payload: roundedAverage,
      });
    } catch (error) {
      console.log("No pudimos obtener el promedio");
    }
  };
};

//GET promedios de todos los productos
export const getAllAvg = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint + "/getallavg");
      const averages = data.promedios;
      return dispatch({
        type: GET_AVGALL,
        payload: averages,
      });
    } catch (error) {
      console.log("No pudimos obtener los promedios");
    }
  };
};

//PATCH del status de un cometnario, pasa a aprobado o rechazado
export const updateReviewStatus = (idReview, idStatus) => {
  const id = idReview;
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(
        endPoint + "/updatereviewstatus/" + id,
        { idStatus: idStatus }
      );
      return dispatch({
        type: "",
        payload: data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudimos aprobar/rechazar el comentario",
        footer: "",
      });
      console.log("No pudimos aprobar/rechazar el comentario");
    }
  };
};

//! CARRITO -> CHECKOUT
/* OBTIENE LOS DATOS DEL CARRITO-TEMPORAL */
export const getCartByUser = (idUser) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint + `/getcarrito/${idUser}`);
      // console.log(data.carritoItems);

      return dispatch({
        type: GET_CART_BY_USER,
        payload: data.carritoItems,
      });
    } catch (error) {
      console.log(
        "No se pudo obtener el carrito de ese usuario",
        error.message
      );
    }
  };
};
export const sendCartToMercadoPago = (cart) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endPoint + "/create-payment", cart);
      // console.log(data);
      return dispatch({
        type: SEND_CART_MERCADO_PAGO,
        payload: data,
      });
    } catch (error) {
      console.log("Error al enviar el carrito a mercado Pago", error.message);
    }
  };
};
