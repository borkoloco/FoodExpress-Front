import { useEffect, useState } from "react";
import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { Modal } from "../../../ui/components/Modal/Modal";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddresUserById,
  getAddresByUser,
  sendAddressByUser,
} from "../../../redux/actions/action";
import style from "./AddresPage.module.css";
import { Loading2 } from "../../../ui/components/Loading2/Loading2";

export const AddressPage = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);
  const dataLoginUser = JSON.parse(localStorage.getItem("sesion"));
  // const authenticated = validateSesion(dataLoginUser);
  const [loading, setLoading] = useState(false);
  const { formState, onInputChange, setFormState, errors } = useForm({
    address: "",
  });

  const getAllAddress = async () => {
    await dispatch(getAddresByUser(dataLoginUser.idUser));
    setLoading(true);
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  const handleClick = async () => {
    // setLoading(false);
    await dispatch(sendAddressByUser(formState.address, dataLoginUser.idUser));
    getAllAddress();
    setFormState({ address: "" });
  };

  const handleRemove = async (event) => {
    const idAddress = event.target.value;
    // setLoading(false);
    await dispatch(deleteAddresUserById(dataLoginUser.idUser, idAddress));
    getAllAddress();
  };

  return (
    <>
      <div className={style.containerHeader}>
        <BackButton />
        <hr />
        <h3>Address</h3>
      </div>

      <div className={style.containerAddressPage}>
        <div>
          {/* direcciones */}
          {loading ? (
            address && address.direcciones && address.direcciones.length > 0 ? (
              address.direcciones.map((e, index) => (
                <div key={index} className={style.groupAddress}>
                  <span className={style.titleAdress}>{e.calle}</span>
                  <button
                    value={e.idDireccion}
                    onClick={(e) => handleRemove(e)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>
                {!address || !address.direcciones
                  ? "There is nothing to show"
                  : "There are no addresses. Please add some"}
              </p>
            )
          ) : (
            <Loading2 />
          )}
          <hr />

          {/* Añadir nueva direccion */}

          
          <div>
            <Modal
              id="modal1"
              title="Add your Address"
              buttonName="Add new address"
            >
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  className="form-control"
                  type="email"
                  name="address"
                  value={formState.address}
                  onChange={onInputChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => handleClick()}
              >
                Submit
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
