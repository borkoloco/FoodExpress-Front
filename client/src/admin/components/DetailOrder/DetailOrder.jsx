import { useParams } from "react-router-dom";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetailMenu, filterOrder, getMenuDetailById } from "../../../redux/actions/action";
import { Loading } from "../../../ui/components/Loading/Loading";
import { transformarFecha } from "../../../utils/formatFecha";
import { Loading2 } from "../../../ui/components/Loading2/Loading2";
import style from "./DetailOrder.module.css";

export const DetailOrder = () => {
  const { idOrder } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const filteredOrder = useSelector((state) => state.filteredOrder);
  const menuDetail = useSelector((state) => state.menuDetail);
  const [menus, setMenus] = useState([]);

  const allOrders = async () => {
    await dispatch(filterOrder(idOrder));
  };

  useEffect(() => {
    allOrders();
    setIsLoading(false);
    console.log(filteredOrder);
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      if (filteredOrder && filteredOrder.orderItems) {
        // Iterar sobre cada ID de menú y obtener los detalles
        const menusPromises = filteredOrder.orderItems.map(async (menus) => {
          const menu = await dispatch(getMenuDetailById(menus.idMenu));
          return menu;
        });

        // Esperar a que se resuelvan todas las promesas de detalles de menú
        const resolvedMenus = await Promise.all(menusPromises);
        setMenus(resolvedMenus); // Almacenar los menús obtenidos en el estado
        
        setTimeout(() => {
            setIsLoading2(false);
        },1200)
      }
    };
    fetchMenus();
  }, [filteredOrder]);

  return (
    <>
      <BackButton />

      {!isLoading ? (
        filteredOrder ? (
          <div className={`${style.containerDetail}`}>
            <div className={` ${style.orderInfo}`}>
              <h5>Order ID: {filteredOrder.idOrden}</h5>
              <span>{transformarFecha(filteredOrder.fecha_de_compra)}</span>
              <div>
                <span>
                  Payment type:
                  {filteredOrder.metodo_de_compra === null
                    ? " null"
                    : " "+filteredOrder.metodo_de_compra}
                </span>
              </div>
              <div>
                <span>
                  Payment:
                  {filteredOrder.estado === "Approved" ? " Paid" : " Declined"}
                </span>
              </div>
            </div>

            <div className={style.containerDetailsPurchase}>
                <div className={`${style.OrderDetails}`}>
                  <h5>Order Details</h5>
                  <hr />
               
                  {
                    
                    !isLoading2 ? (menus.map((menu, index) => (
                        <div className={style.cardMenu} key={index}>
                          <img
                            className={style.imgMenu}
                            src={menu.payload.imageUrl}
                            alt={menu.payload.nameMenu}
                          />
                          <div className={style.infoMenu}>
                            <p>
                              <strong>{menu.payload.nameMenu}</strong>
                            </p>
                            {/* <span>$ {menu.payload.price}</span> */}
                            <p>x{filteredOrder.orderItems[index].cantidad}</p>
                          </div>
                        </div>
                      ))) :  <Loading2/>
                    }
                </div>
                <div className={`${style.amount}`}>
                  <h5>Purchase details</h5>
                  <hr />
                  <p>Subtotal: {filteredOrder.subtotal} </p>
                  <p>Address: {filteredOrder.direccion} </p>
                  <hr />
                  <p>Total: {filteredOrder.subtotal} </p>
                  <hr />
                  <p>Customer note: {filteredOrder.nota} </p>
                </div>
                          </div>
            </div>
        ) : (
          <p>No se encontró la orden con ID {idOrder}</p>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};
