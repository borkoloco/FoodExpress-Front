import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const AddressSelect = ({ formState, onInputChange }) => {
  const address = useSelector((state) => state.address);

  return (
    <div className="mb-4">
      {address.direcciones.length > 0 ? (
        <select 
          className="form-select " 
          aria-label="Default select example"
          name="address"
          onChange={onInputChange} 
        >
          <option selected>Select Address</option>
          {address.direcciones.map((userAddress, index) => (
            <option key={index} value={userAddress.calle}>
              {userAddress.calle}
            </option>
          ))}
        </select>
      ) : (
        <NavLink to="/address">Add Address</NavLink>
      )}


    </div>
  );
};
