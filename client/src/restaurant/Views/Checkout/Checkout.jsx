import { BackButton } from "../../../ui/components/BackButton/BackButton";
import style from "./Checkout.module.css";

export const Checkout = () => {
  return (
    <>
      <div className={style.containerHeader}>
        <BackButton />
        <hr />
        <h2>Checkout</h2>
      </div>
      <div className={style.containerCheckout}>
        <div className={style.billingDetails}>
          <h3>Billing Details</h3>
          <hr />
          <form>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  aria-label="First name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  aria-label="Last name"
                />
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                DNI
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Address
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <h3>Additional Information</h3>
            <hr />
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Order notes (optional)
              </label>
              <textarea
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            {/* <button type="submit" className="btn btn-primary">
                Submit
              </button> */}
          </form>
        </div>
        <div className={style.yourOrder}>
          <h3>Your Order</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col"></th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pizza vegetariana x2</td>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  beatae ab maiores id impedit neque consectetur aliquam
                  quibusdam fuga.
                </td>
                <td>$220</td>
              </tr>
              {/* Información de precios fija */}
              <tr>
                <td>Subtotal</td>
                <td></td>
                <td>$220</td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
                <td>$220</td>
              </tr>
            </tbody>
          </table>
          <div>
            <p className="d-inline-flex gap-1">
              <a
                className="btn btn-warning"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Pay with Mercadopago
              </a>
            </p>
            <div className="collapse" id="collapseExample">
              <div className="card card-body">
                Form de MercadoPago, opciones ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
