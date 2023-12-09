import { BackButton } from "../../../ui/components/BackButton/BackButton";
import { Modal } from "../../../ui/components/Modal/Modal";
import { useForm } from "../../hooks/useForm";
import style from "./AddresPage.module.css";

// const { formState, onInputChange, errors } = useForm({address:""});

export const AddressPage = () => {
  return (
    <>
      <div className={style.containerHeader}>
        <BackButton />
        <hr />
        <h3>Address</h3>
      </div>

      <div className={style.containerAddressPage}>
        <div>
          <p>Direcction 1</p>
          <p>Direcction 1</p>
          <p>Direcction 1</p>
          <p>Direcction 1</p>
        </div>

        <Modal id="modal1" title="Add your Address" buttonName="Add">
     
            <div className="mb-3">
              <label className="form-label">
                Address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            
            <button type="submit" className="btn btn-dark">
              Submit
            </button>

        </Modal>


      </div>
    </>
  );
};
