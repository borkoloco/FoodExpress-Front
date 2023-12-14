import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";

import style from "./Address.module.css";
import { useState } from "react";

export const AddressSelect = ({ formState, onInputChange }) => {
  const address = useSelector((state) => state.address);

  const [selectedAddress, setSelectedAddress] = useState('');

  const handleAddressChange = (event) => {
    const { value } = event.target;
    setSelectedAddress(value);
    onInputChange(event); // Llama a la función externa con el cambio
  };

  return (
    <>
      <div className="mb-4">
        <label className="mb-2">Select Address: </label>
        {address.direcciones.length > 0 ? (
          <select
            className="form-select"
            aria-label="Default select example"
            name="address"
            value={selectedAddress}
            onChange={handleAddressChange}
          >
            <option value="" disabled>Select Address</option>
            {address.direcciones.map((userAddress, index) => (
              <option key={index} value={userAddress.calle}>
                {userAddress.calle}
              </option>
            ))}
          </select>
        ) : (
          <NavLink className={style.textDecoration} to="/address">
            <p>
              <button className={style.buttonAddAdress}>
                <IoIosAddCircle />
                {" Address"}
              </button>
            </p>
          </NavLink>
        )}
      </div>
    </>
  );
};