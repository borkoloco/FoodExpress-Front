import { useEffect } from "react";
import { CiDollar, CiUser, CiViewList } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  getAllMenu,
  getOrders,
  getUsersBanned,
} from "../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { organizeOrders } from "../../../utils/organizeOrders";
import { Graphic } from "../Graphic/Graphic";

/* Aqui lo podemos usar para mostrar las estadísticas */
export const HomeAdmin = () => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  const allOrders = useSelector((state) => state.allOrders);
  const allusers = useSelector((state) => state.allusers);
  const allMenu = useSelector((state) => state.allMenu);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getOrders());
        await dispatch(getUsersBanned());
        await dispatch(getAllMenu());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="text-black fs-4 mt-2">Statistics</h1>
        <hr />
        <div className="col-md-3 p-1">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <CiDollar size={50} />
            <div>
              <span className="fs-5">Total Sales</span>
              <h3 className="fs-2">
                ${accumulateSubtotals(organizeOrders(allOrders))}
              </h3>
            </div>
            {/* <i className="bi bi-cart-plus p-3 fs-1"></i> */}
          </div>
        </div>
        <div className="col-md-3 p-1">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <IoFastFoodOutline size={40} />
            <div>
              <span className="fs-5">Total Orders</span>
              <h3 className="fs-2">{organizeOrders(allOrders).length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 p-1">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <CiUser size={40} />
            <div>
              <span className="fs-5">Customers</span>
              <h3 className="fs-2">{allusers.length}</h3>
            </div>
            {/* <i className="bi bi-truck p-3 fs-1"></i> */}
          </div>
        </div>
        <div className="col-md-3 p-1">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <CiViewList size={50} />
            <div>
              <span className="fs-5">Menu Items</span>
              <h3 className="fs-2">{allMenu.length}</h3>
            </div>
            {/* <i className="bi bi-graph-up-arrow p-3 fs-1"></i> */}
          </div>
        </div>
      </div>
      <Graphic ordersData={organizeOrders(allOrders)}/>
    </div>
  );
};

const accumulateSubtotals = (objectsArray) => {
  const total = objectsArray.reduce((accumulator, currentValue) => {
    const subtotal = parseFloat(currentValue.subtotal);
    return accumulator + (isNaN(subtotal) ? 0 : subtotal);
  }, 0);

  return total;
};
