import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresByUser } from "../../../redux/actions/action";

export const FormBillingDetails = ({ dataUser, formState, onInputChange }) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddresByUser(dataUser.idUser));
  }, []);

  return (
    <>
      <h3>Billing Details</h3>
      <hr />
      <form>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={dataUser.nameUser}
              aria-label="First name"
              disabled
            />
          </div>
          <div className="col">
            <label className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder={dataUser.email}
              aria-describedby="emailHelp"
              disabled
            />
          </div>
        </div>
        {/* <div className="mb-3">
          <label className="form-label">
            DNI
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div> */}

        {/* {address.direcciones && (
          <AddressComponent address={address} formState={formState} onInputChange={onInputChange} />
        )} */}

        <h3>Additional Information</h3>
        <hr />
        <div className="mb-3">
          <label className="form-label">
            Order notes (optional)
          </label>
          <textarea
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
      </form>
    </>
  );
};
