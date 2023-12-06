import React, { useEffect, useState } from "react";
import { Loading2 } from "../../../ui/components/Loading2/Loading2";

export const TableYourOrder = ({ handleClick, properties }) => {

  const [loading, setLoading] = useState(false);

  const calculateSubtotal = () => {
    let subtotal = 0;

    properties.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    return subtotal;
  };

  useEffect(() => {
    // Simula el tiempo de carga
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1500); // Cambia este valor por el tiempo que realmente demoran en llegar las properties

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
          {loading ? (
            <>
              {properties.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.nameMenu} x{item.quantity}
                  </td>
                  <td>{item.description}</td>
                  <td>${item.subtotal}</td>
                </tr>
              ))}

              <tr>
                <td>Subtotal</td>
                <td></td>
                <td>${calculateSubtotal()}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
                <td>${calculateSubtotal()}</td>
              </tr>
            </>
          ) : (
            <Loading2 />
          )}

          {/* Información de precios fija */}
        </tbody>
      </table>
      <div>
        <button onClick={() => handleClick()} className="btn btn-warning">
          Pay with MercadoPago
        </button>
        {/* <p className="d-inline-flex gap-1">
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
            </div> */}
      </div>
    </>
  );
};
