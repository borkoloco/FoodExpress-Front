

import React from 'react'


/* Aqui lo podemos usar para mostrar las estadísticas */
export const HomeAdmin = () => {
  return (
    <div className="container-fluid">
    <div className="row">
    <caption className="text-black fs-4">Statistics</caption>
      <div className="col-md-3 p-1">
        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
          <div>
            <h3 className="fs-2">230</h3> <p className="fs-5">Products</p>
          </div>
          {/* <i className="bi bi-cart-plus p-3 fs-1"></i> */}
        </div>
      </div>
      <div className="col-md-3 p-1">
        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
          <div>
            <h3 className="fs-2">2450</h3> <p className="fs-5">Sales</p>
          </div>
          {/* <i className="bi bi-currency-dollar p-3 fs-1"></i> */}
        </div>
      </div>
      <div className="col-md-3 p-1">
        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
          <div>
            <h3 className="fs-2">2250</h3> <p className="fs-5">Bookings</p>
          </div>
          {/* <i className="bi bi-truck p-3 fs-1"></i> */}
        </div>
      </div>
      <div className="col-md-3 p-1">
        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
          <div>
            <h3 className="fs-2">20%</h3> <p className="fs-5">Increase</p>
          </div>
          {/* <i className="bi bi-graph-up-arrow p-3 fs-1"></i> */}
        </div>
      </div>
    </div>
  </div>
  )
}
