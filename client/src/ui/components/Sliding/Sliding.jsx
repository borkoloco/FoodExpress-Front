import React from 'react';
import { Offcanvas } from 'bootstrap'; // Importa Offcanvas desde Bootstrap
import style from './Sliding.module.css'; // Importa los estilos

export const Sliding = ({ btnName,btnStyle, component, title,  }) => {
  const offcanvasRef = React.useRef(null);

  // Función para abrir el offcanvas
  const openOffcanvas = () => {
    const offcanvas = new Offcanvas(offcanvasRef.current);
    offcanvas.show();
  };

  return (
    <>
      {/* Botón para abrir el offcanvas */}
      <button
        className={`btn ${btnStyle}`}
        type="button"
        onClick={openOffcanvas}
      >
        {btnName}
      </button>

      {/* Panel deslizante */}
      <div
        className={`offcanvas offcanvas-end ${style.customOffcanvas}`}
        ref={offcanvasRef}
        tabIndex="-1"
        aria-labelledby="offcanvasRightLabel"
        style={{ width: '40%' }} // Ancho del offcanvas al 40%
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            {title}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
         {component}
        </div>
      </div>
    </>
  );
};
