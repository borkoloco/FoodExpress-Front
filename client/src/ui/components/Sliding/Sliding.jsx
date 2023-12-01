export const Sliding = ({ btnName, btnStyle, title, component, offcanvasId, eventHandler,id }) => {

  console.log({eventHandler,id});

  return (
    <>
      <button
        id={id}
        className={`btn btn-primary ${btnStyle}`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#${offcanvasId}`} // Utiliza el identificador único
        aria-controls={offcanvasId}
        onClick={eventHandler}
      >
        {btnName}
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id={offcanvasId} // Usa el identificador único aquí también
        aria-labelledby={`${offcanvasId}Label`}
        style={{ width: '40%' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id={`${offcanvasId}Label`}>
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

